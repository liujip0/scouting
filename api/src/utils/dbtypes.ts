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
  flag: z.string(),
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
  "flag",
] as CommonEntryColumn[];

export const TeamMatchEntrySchema = CommonEntrySchema.omit({
  robotNumber: true,
}).extend({
  robotNumber: z.union([z.literal(1), z.literal(2), z.literal(3)]),

  noShow: z.boolean(),
  //TODO: Starting Location
  died: z.boolean(),
  playedDefense: z.boolean(),
  goodAtCoral: z.boolean(),
  goodAtAlgae: z.boolean(),
  goodAtClimb: z.boolean(),
  goodAtDefense: z.boolean(),
  goodAtWorkingWithAlliance: z.boolean(),
  //TODO: Outstanding Tasks
  comments: z.string(),

  autoCrossedRSL: z.boolean(),
  //TODO: Exact Coral Placement
  autoProcessor: z.number().int().nonnegative(),
  autoNet: z.number().int().nonnegative(),
  autoRemovedAlgaeFromReef: z.boolean(),

  teleopL1: z.number().int().nonnegative(),
  teleopL2: z.number().int().nonnegative(),
  teleopL3: z.number().int().nonnegative(),
  teleopL4: z.number().int().nonnegative(),
  teleopProcessor: z.number().int().nonnegative(),
  teleopNet: z.number().int().nonnegative(),
  teleopRemovedAlgaeFromReef: z.boolean(),
  teleopAttemptedClimb: z.boolean(),
  teleopSuccessfulClimb: z.boolean(),
});
export type TeamMatchEntry = z.infer<typeof TeamMatchEntrySchema>;
export type TeamMatchEntryColumn = keyof TeamMatchEntry;
export const TeamMatchEntryColumns: TeamMatchEntryColumn[] = [
  ...CommonEntryColumns,

  "noShow",
  //TODO: Starting Location
  "died",
  "playedDefense",
  "goodAtCoral",
  "goodAtAlgae",
  "goodAtClimb",
  "goodAtDefense",
  "goodAtWorkingWithAlliance",
  //TODO: Outstanding Tasks
  "comments",

  "autoCrossedRSL",
  //TODO: Exact Coral Placement
  "autoProcessor",
  "autoNet",
  "autoRemovedAlgaeFromReef",

  "teleopL1",
  "teleopL2",
  "teleopL3",
  "teleopL4",
  "teleopProcessor",
  "teleopNet",
  "teleopRemovedAlgaeFromReef",
  "teleopAttemptedClimb",
  "teleopSuccessfulClimb",
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
  flag: "",

  noShow: false,
  //Starting Location
  died: false,
  playedDefense: false,
  goodAtCoral: false,
  goodAtAlgae: false,
  goodAtClimb: false,
  goodAtDefense: false,
  goodAtWorkingWithAlliance: false,
  //Outstanding Tasks
  comments: "",

  autoCrossedRSL: false,
  //Exact Coral Placement
  autoProcessor: 0,
  autoNet: 0,
  autoRemovedAlgaeFromReef: false,

  teleopL1: 0,
  teleopL2: 0,
  teleopL3: 0,
  teleopL4: 0,
  teleopProcessor: 0,
  teleopNet: 0,
  teleopRemovedAlgaeFromReef: false,
  teleopAttemptedClimb: false,
  teleopSuccessfulClimb: false,
};

export const HumanPlayerEntrySchema = CommonEntrySchema.omit({
  robotNumber: true,
}).extend({
  robotNumber: z.literal(4),

  humanAttemptedNet: z.number().int().nonnegative(),
  humanSuccessfulNet: z.number().int().nonnegative(),
  comments: z.string(),
});
export type HumanPlayerEntry = z.infer<typeof HumanPlayerEntrySchema>;
export type HumanPlayerEntryColumn = keyof HumanPlayerEntry;
export const HumanPlayerEntryColumns: HumanPlayerEntryColumn[] = [
  ...CommonEntryColumns,

  "humanAttemptedNet",
  "humanSuccessfulNet",
  "comments",
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
  flag: "",

  humanAttemptedNet: 0,
  humanSuccessfulNet: 0,
  comments: "",
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
