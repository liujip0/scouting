import { D1PreparedStatement } from "@cloudflare/workers-types";
import { z } from "zod";
import { loggedPublicProcedure } from "../trpc.ts";
import {
  HumanPlayerEntryColumns,
  TeamMatchEntryColumns,
} from "../utils/dbtypes.ts";

export const putEntries = loggedPublicProcedure
  .input(
    z.array(
      z.union([
        z.object({
          eventKey: z.string(),
          matchKey: z.string(),
          teamNumber: z.number().int().nonnegative(),
          alliance: z.union([z.literal("Red"), z.literal("Blue")]),
          robotNumber: z.union([z.literal(1), z.literal(2), z.literal(3)]),
          deviceTeamNumber: z.number().int().nonnegative(),
          deviceId: z.string(),
          scoutTeamNumber: z.number().int().nonnegative(),
          scoutName: z.string(),
          flagged: z.boolean(),

          autoNote1: z.boolean(),
          autoNote2: z.boolean(),
          autoNote3: z.boolean(),
          autoNote4: z.boolean(),
          autoNote5: z.boolean(),
          autoNote6: z.boolean(),
          autoNote7: z.boolean(),
          autoNote8: z.boolean(),
          autoLeftStartingZone: z.boolean(),
          autoSpeaker: z.number().int().nonnegative(),
          autoAmp: z.number().int().nonnegative(),

          teleopSpeaker: z.number().int().nonnegative(),
          teleopAmp: z.number().int().nonnegative(),
          teleopTrap: z.number().int().nonnegative(),
          teleopPassed: z.number().int().nonnegative(),
          teleopStolen: z.number().int().nonnegative(),
          teleopChuteIntake: z.boolean(),
          teleopGroundIntake: z.boolean(),
          teleopEndgame: z.union([
            z.literal("parked"),
            z.literal("climbed"),
            z.literal("none"),
          ]),
          teleopSpotlight: z.number().int().nonnegative(),

          postmatchDriverSkill: z.number().int().nonnegative(),
          postmatchPlayedDefense: z.boolean(),
          postmatchUnderHeavyDefense: z.boolean(),
        }),
        z.object({
          eventKey: z.string(),
          matchKey: z.string(),
          teamNumber: z.number().int().nonnegative(),
          alliance: z.union([z.literal("Red"), z.literal("Blue")]),
          robotNumber: z.literal(4),
          deviceTeamNumber: z.number().int().nonnegative(),
          deviceId: z.string(),
          scoutTeamNumber: z.number().int().nonnegative(),
          scoutName: z.string(),
          flagged: z.boolean(),

          amplifications: z.number().int().nonnegative(),
          spotlights: z.number().int().nonnegative(),
        }),
      ])
    )
  )
  .mutation(async (opts) => {
    const boundStmts: D1PreparedStatement[] = [];

    const teamMatchEntryStmt = opts.ctx.env.DB.prepare(
      `REPLACE INTO
        TeamMatchEntry(
          ${TeamMatchEntryColumns.join(", ")}
        )
      VALUES
        (${"?, ".repeat(TeamMatchEntryColumns.length - 1)}?);`
    );
    const humanPlayerEntryStmt = opts.ctx.env.DB.prepare(
      `REPLACE INTO
        HumanPlayerEntry(
          ${HumanPlayerEntryColumns.join(", ")}
        )
      VALUES
        (${"?, ".repeat(HumanPlayerEntryColumns.length - 1)}?);`
    );

    for (let match of opts.input) {
      if (match.robotNumber === 4) {
        boundStmts.push(
          humanPlayerEntryStmt.bind(
            HumanPlayerEntryColumns.map((column) => match[column])
          )
        );
      } else {
        boundStmts.push(
          teamMatchEntryStmt.bind(
            TeamMatchEntryColumns.map((column) => match[column])
          )
        );
      }
    }

    await opts.ctx.env.DB.batch(boundStmts);
  });
