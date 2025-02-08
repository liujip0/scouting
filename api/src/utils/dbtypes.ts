import { z } from "zod";

export const Alliance = ["Red", "Blue"] as const;

export const CommonEntrySchema = z.object({
  eventKey: z.string(),
  matchKey: z.string(),
  teamNumber: z.number().int().nonnegative(),
  alliance: z.union([z.literal("Red"), z.literal("Blue")]),
  robotNumber: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  deviceTeamNumber: z.number().int().nonnegative(),
  deviceId: z.string(),
  scoutTeamNumber: z.number().int().nonnegative(),
  scoutName: z.string(),
  flagged: z.boolean(),
});
export type CommonEntry = z.infer<typeof CommonEntrySchema>;
export type CommonEntryColumn = keyof CommonEntry;
export const CommonEntryColumns: CommonEntryColumn[] = [
  "eventKey",
  "matchKey",
  "teamNumber",
  "alliance",
  "robotNumber",
  "deviceTeamNumber",
  "deviceId",
  "scoutTeamNumber",
  "scoutName",
  "flagged",
] as CommonEntryColumn[];

export const TeamMatchEntrySchema = CommonEntrySchema.omit({
  robotNumber: true,
}).extend({
  robotNumber: z.union([z.literal(1), z.literal(2), z.literal(3)]),

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
});
export type TeamMatchEntry = z.infer<typeof TeamMatchEntrySchema>;
export type TeamMatchEntryColumn = keyof TeamMatchEntry;
export const TeamMatchEntryColumns: TeamMatchEntryColumn[] = [
  ...CommonEntryColumns,

  "autoNote1",
  "autoNote2",
  "autoNote3",
  "autoNote4",
  "autoNote5",
  "autoNote6",
  "autoNote7",
  "autoNote8",
  "autoLeftStartingZone",
  "autoSpeaker",
  "autoAmp",

  "teleopSpeaker",
  "teleopAmp",
  "teleopTrap",
  "teleopPassed",
  "teleopStolen",
  "teleopChuteIntake",
  "teleopGroundIntake",
  "teleopEndgame",
  "teleopSpotlight",

  "postmatchDriverSkill",
  "postmatchPlayedDefense",
  "postmatchUnderHeavyDefense",
] as TeamMatchEntryColumn[];
export const TeamMatchEntryInit: TeamMatchEntry = {
  eventKey: "",
  matchKey: "qm1",
  teamNumber: 0,
  alliance: "Red",
  robotNumber: 1,
  deviceTeamNumber: 0,
  deviceId: "",
  scoutTeamNumber: 0,
  scoutName: "",
  flagged: false,

  autoNote1: false,
  autoNote2: false,
  autoNote3: false,
  autoNote4: false,
  autoNote5: false,
  autoNote6: false,
  autoNote7: false,
  autoNote8: false,
  autoLeftStartingZone: false,
  autoSpeaker: 0,
  autoAmp: 0,

  teleopSpeaker: 0,
  teleopAmp: 0,
  teleopTrap: 0,
  teleopPassed: 0,
  teleopStolen: 0,
  teleopChuteIntake: false,
  teleopGroundIntake: false,
  teleopEndgame: "none",
  teleopSpotlight: 0,

  postmatchDriverSkill: 0,
  postmatchPlayedDefense: false,
  postmatchUnderHeavyDefense: false,
};

export const HumanPlayerEntrySchema = CommonEntrySchema.omit({
  robotNumber: true,
}).extend({
  robotNumber: z.literal(4),

  amplifications: z.number().int().nonnegative(),
  spotlights: z.number().int().nonnegative(),
});
export type HumanPlayerEntry = z.infer<typeof HumanPlayerEntrySchema>;
export type HumanPlayerEntryColumn = keyof HumanPlayerEntry;
export const HumanPlayerEntryColumns: HumanPlayerEntryColumn[] = [
  ...CommonEntryColumns,

  "amplifications",
  "spotlights",
] as HumanPlayerEntryColumn[];
export const HumanPlayerEntryInit: HumanPlayerEntry = {
  eventKey: "",
  matchKey: "qm1",
  teamNumber: 0,
  alliance: "Red",
  robotNumber: 4,
  deviceTeamNumber: 0,
  deviceId: "",
  scoutTeamNumber: 0,
  scoutName: "",
  flagged: false,

  amplifications: 0,
  spotlights: 0,
};

export const UserPermLevel = [
  "none",
  "demo",
  "team",
  "datamanage",
  "admin",
] as const;
export type User = {
  username: string;
  permLevel: (typeof UserPermLevel)[number];
  hashedPassword: string;
};
export const UserColumns = ["username", "permLevel", "hashedPassword"] as const;
export type UserColumn = (typeof UserColumns)[number];

export type DBEvent = {
  eventKey: string;
  eventName: string;
};
export type Match = {
  eventKey: string;
  matchKey: string;
  red1: number;
  red2: number;
  red3: number;
  blue1: number;
  blue2: number;
  blue3: number;
};
export const MatchColumns = [
  "eventKey",
  "matchKey",
  "red1",
  "red2",
  "red3",
  "blue1",
  "blue2",
  "blue3",
] as const;
export type MatchColumn = (typeof MatchColumns)[number];
