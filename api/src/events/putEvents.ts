import { D1PreparedStatement } from "@cloudflare/workers-types";
import { z } from "zod";
import { loggedPublicProcedure } from "../trpc.ts";
import { DBEvent, Match } from "../utils/dbtypes.ts";
import { omit } from "../utils/utils.ts";

export const putEvents = loggedPublicProcedure
  .input(
    z.array(
      z.object({
        eventKey: z.string(),
        eventName: z.string(),
        matches: z.array(
          z.object({
            eventKey: z.string(),
            matchKey: z.string(),
            red1: z.number().int().positive(),
            red2: z.number().int().positive(),
            red3: z.number().int().positive(),
            blue1: z.number().int().positive(),
            blue2: z.number().int().positive(),
            blue3: z.number().int().positive(),
          })
        ),
      })
    )
  )
  .mutation(async (opts) => {
    const events: DBEvent[] = [];
    const matches: Match[] = [];

    opts.input.forEach((event) => {
      events.push(omit("matches", event) as DBEvent);
      event.matches.forEach((match) => {
        matches.push(match);
      });
    });

    const boundStmts: D1PreparedStatement[] = [];

    const eventStmt = opts.ctx.env.DB.prepare(
      `REPLACE INTO
        Events(eventKey, eventName)
      VALUES (?, ?);`
    );
    events.forEach((event) => {
      boundStmts.push(eventStmt.bind(event.eventKey, event.eventName));
    });

    const matchStmt = opts.ctx.env.DB.prepare(
      `REPLACE INTO
        Matches(eventKey, matchKey, red1, red2, red3, blue1, blue2, blue3)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
    );
    matches.forEach((match) => {
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
  });
