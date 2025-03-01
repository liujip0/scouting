import { D1PreparedStatement } from "@cloudflare/workers-types";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Env } from "../index.ts";
import { loggedPublicProcedure } from "../trpc.ts";
import { DBEvent, Match, MatchLevel } from "../utils/dbtypes.ts";
import { getScheduleFromDB } from "./getEvent.ts";

export const getTbaEvent = loggedPublicProcedure
  .input(z.string())
  .mutation(async (opts) => {
    const res = await updateScheduleFromTba(opts.input, opts.ctx.env);

    switch (res.status) {
      case 200: {
        return res.data!;
      }
      case 404: {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found on TBA.",
        });
      }
      default: {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error while pulling schedule from TBA",
        });
      }
    }
  });

type TbaSimpleMatch = {
  comp_level: "qm" | "ef" | "qf" | "sf" | "f";
  match_number: number;
  alliances: {
    red: {
      team_keys: [string, string, string];
    };
    blue: {
      team_keys: [string, string, string];
    };
  };
  event_key: string;
};
export const updateScheduleFromTba = async (eventKey: string, env: Env) => {
  const etag = await env.KV.get("tba-etag");
  const eventRes = await fetch(
    "https://www.thebluealliance.com/api/v3/event/" +
      eventKey +
      "/matches/simple",
    {
      method: "GET",
      headers:
        etag ?
          {
            "X-TBA-Auth-Key": env.TBA_API_TOKEN,
            "If-None-Match": etag,
          }
        : {
            "X-TBA-Auth-Key": env.TBA_API_TOKEN,
          },
    }
  );
  const eventInfoRes = await fetch(
    "https://www.thebluealliance.com/api/v3/event/" + eventKey + "/simple",
    {
      method: "GET",
      headers:
        etag ?
          {
            "X-TBA-Auth-Key": env.TBA_API_TOKEN,
            "If-None-Match": etag,
          }
        : {
            "X-TBA-Auth-Key": env.TBA_API_TOKEN,
          },
    }
  );

  switch (eventRes.status) {
    case 200: {
      const event: DBEvent & { matches: Match[] } = {
        eventKey: "",
        eventName:
          eventInfoRes.status === 200 ? (await eventInfoRes.json()).name : "",
        matches: [],
      };

      if (eventRes.headers.has("ETag")) {
        await env.KV.put("tba-etag", eventRes.headers.get("ETag")!);
      }
      const eventBody: TbaSimpleMatch[] = await eventRes.json();

      const boundStmts: D1PreparedStatement[] = [];
      eventBody.forEach((match, matchIndex) => {
        if (matchIndex === 0) {
          event.eventKey = match.event_key;
          boundStmts.push(
            env.DB.prepare(
              "REPLACE INTO Events(eventKey, eventName) VALUES(?, ?);"
            ).bind(match.event_key, "")
            //TODO: get event name
          );
        }

        event.matches.push({
          eventKey: match.event_key,
          matchLevel: {
            qm: "Qualification",
            ef: "Playoff",
            qf: "Playoff",
            sf: "Playoff",
            f: "Playoff",
          }[match.comp_level] as (typeof MatchLevel)[number],
          matchNumber: match.match_number,
          red1: parseInt(match.alliances.red.team_keys[0].replace("frc", "")),
          red2: parseInt(match.alliances.red.team_keys[1].replace("frc", "")),
          red3: parseInt(match.alliances.red.team_keys[2].replace("frc", "")),
          blue1: parseInt(match.alliances.blue.team_keys[0].replace("frc", "")),
          blue2: parseInt(match.alliances.blue.team_keys[1].replace("frc", "")),
          blue3: parseInt(match.alliances.blue.team_keys[2].replace("frc", "")),
        });
        boundStmts.push(
          env.DB.prepare(
            `REPLACE INTO
            Matches(eventKey, matchLevel, matchNumber, red1, red2, red3, blue1, blue2, blue3)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`
          ).bind(
            match.event_key,
            {
              qm: "Qualification",
              ef: "Playoff",
              qf: "Playoff",
              sf: "Playoff",
              f: "Playoff",
            }[match.comp_level],
            match.match_number,
            parseInt(match.alliances.red.team_keys[0].replace("frc", "")),
            parseInt(match.alliances.red.team_keys[1].replace("frc", "")),
            parseInt(match.alliances.red.team_keys[2].replace("frc", "")),
            parseInt(match.alliances.blue.team_keys[0].replace("frc", "")),
            parseInt(match.alliances.blue.team_keys[1].replace("frc", "")),
            parseInt(match.alliances.blue.team_keys[2].replace("frc", ""))
          )
        );
      });

      await env.DB.batch(boundStmts);

      return {
        status: 200,
        data: event,
      };
    }
    case 304: {
      const dbSchedule = await getScheduleFromDB(eventKey, env);
      switch (dbSchedule.status) {
        case 200: {
          return {
            status: 200,
            data: dbSchedule.data,
          };
        }
        case 404: {
          //TODO: refetch from TBA
          return {
            status: 404,
            error: "TBA status 304. Event not found in DB.",
          };
        }
        default: {
          return {
            status: 500,
            error: "TBA status 304. Error while fetching schedule from DB.",
          };
        }
      }
    }
    default: {
      console.log(eventRes.statusText);
      return {
        status: eventRes.status,
        error: eventRes.statusText,
      };
    }
  }
};
