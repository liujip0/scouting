import { D1PreparedStatement } from "@cloudflare/workers-types";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { loggedPublicProcedure } from "../trpc.ts";
import { DBEvent, Match } from "../utils/dbtypes.ts";

export const getFrcEvent = loggedPublicProcedure
  .input(z.string())
  .mutation(async (opts) => {
    const eventRes = await fetch(
      "https://frc-api.firstinspires.org/v3.0/" +
        opts.input.substring(0, 4) +
        "/events?eventCode=" +
        opts.input.substring(4),
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(opts.ctx.env.FIRST_API_TOKEN).toString("base64"),
          "If-Modifier-Since": "",
        },
      }
    );

    if (eventRes.status === 200) {
      const eventBody = JSON.parse(await eventRes.text()).Events[0];
      const event: DBEvent & { matches: Match[] } = {
        eventKey: opts.input,
        eventName: eventBody.name,
        matches: [],
      };

      const scheduleRes = await fetch(
        "https://frc-api.firstinspires.org/v3.0/" +
          opts.input.substring(0, 4) +
          "/schedule/" +
          opts.input.substring(4) +
          "?tournamentLevel=Qualification",
        {
          method: "GET",
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(opts.ctx.env.FIRST_API_TOKEN).toString("base64"),
            "If-Modifier-Since": "",
          },
        }
      );

      if (scheduleRes.status === 200) {
        const scheduleBody = JSON.parse(await scheduleRes.text()).Schedule;
        console.log(scheduleBody);
        scheduleBody.forEach(
          (match: {
            description: string;
            startTime: string;
            matchNumber: number;
            field: string;
            tournamentLevel: "Qualification" | "Playoff" | "Practice" | "None";
            teams: {
              teamNumber: number;
              station: "Red1" | "Red2" | "Red3" | "Blue1" | "Blue2" | "Blue3";
              surrogate: boolean;
            }[];
          }) => {
            const newMatch: Match = {
              eventKey: opts.input,
              matchKey: "qm" + match.matchNumber,
              red1: 0,
              red2: 0,
              red3: 0,
              blue1: 0,
              blue2: 0,
              blue3: 0,
            };
            match.teams.forEach((team) => {
              newMatch[
                team.station.toLowerCase() as
                  | "red1"
                  | "red2"
                  | "red3"
                  | "blue1"
                  | "blue2"
                  | "blue3"
              ] = team.teamNumber;
            });
            event.matches.push(newMatch);
          }
        );

        const boundStmts: D1PreparedStatement[] = [];
        boundStmts.push(
          opts.ctx.env.DB.prepare(
            `REPLACE INTO
            Events(eventKey, eventName)
          VALUES (?, ?);`
          ).bind(event.eventKey, event.eventName)
        );
        const matchStmt = opts.ctx.env.DB.prepare(
          `REPLACE INTO
            Matches(eventKey, matchKey, red1, red2, red3, blue1, blue2, blue3)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
        );
        event.matches.forEach((match) => {
          boundStmts.push(
            matchStmt.bind(
              match.eventKey,
              match.matchKey,
              match.red1,
              match.red2,
              match.red3,
              match.blue1,
              match.blue2,
              match.blue3
            )
          );
        });
        await opts.ctx.env.DB.batch(boundStmts);

        return event;
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: scheduleRes.statusText,
        });
      }
    } else if (eventRes.status === 404) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event not found.",
      });
    } else {
      console.log(eventRes);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: eventRes.statusText,
      });
    }
  });
