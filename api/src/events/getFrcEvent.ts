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
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: eventRes.statusText,
      });
    }
  });
