import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { loggedPublicProcedure } from "../trpc.ts";
import { DBEvent, Match } from "../utils/dbtypes.ts";

export const getEvent = loggedPublicProcedure
  .input(z.string())
  .mutation(async (opts) => {
    const event = await opts.ctx.env.DB.prepare(
      "SELECT eventKey, eventName from Events WHERE eventKey = ? LIMIT 1;"
    )
      .bind(opts.input)
      .first<DBEvent>();

    if (event) {
      const matches = await opts.ctx.env.DB.prepare(
        `SELECT eventKey, matchKey, red1, red2, red3, blue1, blue2, blue3
          FROM Matches
          WHERE eventKey = ?;`
      )
        .bind(opts.input)
        .all<Match>();

      if (matches.success) {
        return {
          ...event,
          matches: matches.results,
        };
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error while fetching matches.",
        });
      }
    } else {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event not in ISA database. Try FRC Events API.",
      });
    }
  });
