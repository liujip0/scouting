import { D1PreparedStatement } from "@cloudflare/workers-types";
import { z } from "zod";
import { loggedPublicProcedure } from "../trpc.ts";
import {
  HumanPlayerEntryColumns,
  HumanPlayerEntrySchema,
  TeamMatchEntryColumns,
  TeamMatchEntrySchema,
} from "../utils/dbtypes.ts";

export const putEntries = loggedPublicProcedure
  .input(z.array(z.union([TeamMatchEntrySchema, HumanPlayerEntrySchema])))
  .mutation(async (opts) => {
    const boundStmts: D1PreparedStatement[] = [];

    const teamMatchEntryStmt = opts.ctx.env.DB.prepare(
      `REPLACE INTO
        TeamMatchEntry(
          ${TeamMatchEntryColumns.join(", ")}
        )
      VALUES
        (${new Array(TeamMatchEntryColumns.length).fill("?").join(",")});`
    );
    const humanPlayerEntryStmt = opts.ctx.env.DB.prepare(
      `REPLACE INTO
        HumanPlayerEntry(
          ${HumanPlayerEntryColumns.join(", ")}
        )
      VALUES
        (${new Array(HumanPlayerEntryColumns.length).fill("?").join(",")});`
    );

    for (let match of opts.input) {
      if (match.robotNumber === 4) {
        boundStmts.push(
          humanPlayerEntryStmt.bind(
            ...HumanPlayerEntryColumns.map((column) => match[column])
          )
        );
      } else {
        boundStmts.push(
          teamMatchEntryStmt.bind(
            ...TeamMatchEntryColumns.map((column) => match[column])
          )
        );
      }
    }

    await opts.ctx.env.DB.batch(boundStmts);
  });
