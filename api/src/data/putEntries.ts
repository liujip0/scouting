import { D1PreparedStatement } from "@cloudflare/workers-types";
import { z } from "zod";
import { loggedPublicProcedure } from "../trpc.ts";

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
          eventKey, matchKey, teamNumber, alliance, robotNumber, deviceTeamNumber, deviceId, scoutTeamNumber, scoutName,
          autoNote1, autoNote2, autoNote3, autoNote4, autoNote5, autoNote6, autoNote7, autoNote8, autoLeftStartingZone, autoSpeaker, autoAmp,
          teleopSpeaker, teleopAmp, teleopTrap, teleopPassed, teleopStolen, teleopChuteIntake, teleopGroundIntake, teleopEndgame, teleopSpotlight,
          postmatchDriverSkill, postmatchPlayedDefense, postmatchUnderHeavyDefense
        )
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    );
    const humanPlayerEntryStmt = opts.ctx.env.DB.prepare(
      `REPLACE INTO
        HumanPlayerEntry(
          eventKey, matchKey, teamNumber, alliance, robotNumber, deviceTeamNumber, deviceId, scoutTeamNumber, scoutName,
          amplifications, spotlights
        )
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?);`
    );

    for (let match of opts.input) {
      if (match.robotNumber === 4) {
        boundStmts.push(
          humanPlayerEntryStmt.bind(
            match.eventKey,
            match.matchKey,
            match.teamNumber,
            match.alliance,
            match.robotNumber,
            match.deviceTeamNumber,
            match.deviceId,
            match.scoutTeamNumber,
            match.scoutName,

            match.amplifications,
            match.spotlights
          )
        );
      } else {
        boundStmts.push(
          teamMatchEntryStmt.bind(
            match.eventKey,
            match.matchKey,
            match.teamNumber,
            match.alliance,
            match.robotNumber,
            match.deviceTeamNumber,
            match.deviceId,
            match.scoutTeamNumber,
            match.scoutName,

            match.autoNote1,
            match.autoNote2,
            match.autoNote3,
            match.autoNote4,
            match.autoNote5,
            match.autoNote6,
            match.autoNote7,
            match.autoNote8,
            match.autoLeftStartingZone,
            match.autoSpeaker,
            match.autoAmp,

            match.teleopSpeaker,
            match.teleopAmp,
            match.teleopTrap,
            match.teleopPassed,
            match.teleopStolen,
            match.teleopChuteIntake,
            match.teleopGroundIntake,
            match.teleopEndgame,
            match.teleopSpotlight,

            match.postmatchDriverSkill,
            match.postmatchPlayedDefense,
            match.postmatchUnderHeavyDefense
          )
        );
      }
    }

    await opts.ctx.env.DB.batch(boundStmts);
  });
