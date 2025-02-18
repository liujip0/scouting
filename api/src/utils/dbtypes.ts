import { z } from "zod";

export const Alliance = ["Red", "Blue"] as const;
export const MatchLevel = [
  "None",
  "Practice",
  "Qualification",
  "Playoff",
] as const;

export const CommonEntrySchema = z.object({
  eventKey: z.string(),
  matchLevel: z.union([
    z.literal("None"),
    z.literal("Practice"),
    z.literal("Qualification"),
    z.literal("Playoff"),
  ]),
  matchNumber: z.number().int().nonnegative(),
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
  "matchLevel",
  "matchNumber",
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
  startingLocationA: z.boolean().nullable(),
  startingLocationB: z.boolean().nullable(),
  startingLocationC: z.boolean().nullable(),
  died: z.boolean().nullable(),
  playedDefense: z.boolean().nullable(),
  goodAtCoralL1: z.boolean().nullable(),
  goodAtCoralL2: z.boolean().nullable(),
  goodAtCoralL3: z.boolean().nullable(),
  goodAtCoralL4: z.boolean().nullable(),
  goodAtAlgaeNet: z.boolean().nullable(),
  goodAtAlgaeProcessor: z.boolean().nullable(),
  goodAtClimb: z.boolean().nullable(),
  goodAtDefense: z.boolean().nullable(),
  goodAtWorkingWithAlliance: z.boolean().nullable(),
  goodAtDriving: z.boolean().nullable(),
  goodAtAuto: z.boolean().nullable(),
  removedAlgaeFromReef: z.boolean().nullable(),
  comments: z.string().nullable(),

  autoCrossedRSL: z.boolean().nullable(),
  autoCoralAL1: z.boolean().nullable(),
  autoCoralAL2: z.boolean().nullable(),
  autoCoralAL3: z.boolean().nullable(),
  autoCoralAL4: z.boolean().nullable(),
  autoCoralBL1: z.boolean().nullable(),
  autoCoralBL2: z.boolean().nullable(),
  autoCoralBL3: z.boolean().nullable(),
  autoCoralBL4: z.boolean().nullable(),
  autoCoralCL1: z.boolean().nullable(),
  autoCoralCL2: z.boolean().nullable(),
  autoCoralCL3: z.boolean().nullable(),
  autoCoralCL4: z.boolean().nullable(),
  autoCoralDL1: z.boolean().nullable(),
  autoCoralDL2: z.boolean().nullable(),
  autoCoralDL3: z.boolean().nullable(),
  autoCoralDL4: z.boolean().nullable(),
  autoCoralEL1: z.boolean().nullable(),
  autoCoralEL2: z.boolean().nullable(),
  autoCoralEL3: z.boolean().nullable(),
  autoCoralEL4: z.boolean().nullable(),
  autoCoralFL1: z.boolean().nullable(),
  autoCoralFL2: z.boolean().nullable(),
  autoCoralFL3: z.boolean().nullable(),
  autoCoralFL4: z.boolean().nullable(),
  autoCoralGL1: z.boolean().nullable(),
  autoCoralGL2: z.boolean().nullable(),
  autoCoralGL3: z.boolean().nullable(),
  autoCoralGL4: z.boolean().nullable(),
  autoCoralHL1: z.boolean().nullable(),
  autoCoralHL2: z.boolean().nullable(),
  autoCoralHL3: z.boolean().nullable(),
  autoCoralHL4: z.boolean().nullable(),
  autoCoralIL1: z.boolean().nullable(),
  autoCoralIL2: z.boolean().nullable(),
  autoCoralIL3: z.boolean().nullable(),
  autoCoralIL4: z.boolean().nullable(),
  autoCoralJL1: z.boolean().nullable(),
  autoCoralJL2: z.boolean().nullable(),
  autoCoralJL3: z.boolean().nullable(),
  autoCoralJL4: z.boolean().nullable(),
  autoCoralKL1: z.boolean().nullable(),
  autoCoralKL2: z.boolean().nullable(),
  autoCoralKL3: z.boolean().nullable(),
  autoCoralKL4: z.boolean().nullable(),
  autoCoralLL1: z.boolean().nullable(),
  autoCoralLL2: z.boolean().nullable(),
  autoCoralLL3: z.boolean().nullable(),
  autoCoralLL4: z.boolean().nullable(),
  autoProcessor: z.number().int().nonnegative().nullable(),
  autoNet: z.number().int().nonnegative().nullable(),

  teleopL1: z.number().int().nonnegative().nullable(),
  teleopL2: z.number().int().nonnegative().nullable(),
  teleopL3: z.number().int().nonnegative().nullable(),
  teleopL4: z.number().int().nonnegative().nullable(),
  teleopProcessor: z.number().int().nonnegative().nullable(),
  teleopNet: z.number().int().nonnegative().nullable(),
  teleopPark: z.boolean().nullable(),
  teleopAttemptedShallow: z.boolean().nullable(),
  teleopAttemptedDeep: z.boolean().nullable(),
  teleopSuccessfulShallow: z.boolean().nullable(),
  teleopSuccessfulDeep: z.boolean().nullable(),
});
export type TeamMatchEntry = z.infer<typeof TeamMatchEntrySchema>;
export type TeamMatchEntryColumn = keyof TeamMatchEntry;
export const TeamMatchEntryColumns: TeamMatchEntryColumn[] = [
  ...CommonEntryColumns,

  "noShow",
  "startingLocationA",
  "startingLocationB",
  "startingLocationC",
  "died",
  "playedDefense",
  "goodAtCoralL1",
  "goodAtCoralL2",
  "goodAtCoralL3",
  "goodAtCoralL4",
  "goodAtAlgaeNet",
  "goodAtAlgaeProcessor",
  "goodAtClimb",
  "goodAtDefense",
  "goodAtWorkingWithAlliance",
  "goodAtDriving",
  "goodAtAuto",
  "removedAlgaeFromReef",
  "comments",

  "autoCrossedRSL",
  "autoCoralAL1",
  "autoCoralAL2",
  "autoCoralAL3",
  "autoCoralAL4",
  "autoCoralBL1",
  "autoCoralBL2",
  "autoCoralBL3",
  "autoCoralBL4",
  "autoCoralCL1",
  "autoCoralCL2",
  "autoCoralCL3",
  "autoCoralCL4",
  "autoCoralDL1",
  "autoCoralDL2",
  "autoCoralDL3",
  "autoCoralDL4",
  "autoCoralEL1",
  "autoCoralEL2",
  "autoCoralEL3",
  "autoCoralEL4",
  "autoCoralFL1",
  "autoCoralFL2",
  "autoCoralFL3",
  "autoCoralFL4",
  "autoCoralGL1",
  "autoCoralGL2",
  "autoCoralGL3",
  "autoCoralGL4",
  "autoCoralHL1",
  "autoCoralHL2",
  "autoCoralHL3",
  "autoCoralHL4",
  "autoCoralIL1",
  "autoCoralIL2",
  "autoCoralIL3",
  "autoCoralIL4",
  "autoCoralJL1",
  "autoCoralJL2",
  "autoCoralJL3",
  "autoCoralJL4",
  "autoCoralKL1",
  "autoCoralKL2",
  "autoCoralKL3",
  "autoCoralKL4",
  "autoCoralLL1",
  "autoCoralLL2",
  "autoCoralLL3",
  "autoCoralLL4",
  "autoProcessor",
  "autoNet",

  "teleopL1",
  "teleopL2",
  "teleopL3",
  "teleopL4",
  "teleopProcessor",
  "teleopNet",
  "teleopPark",
  "teleopAttemptedShallow",
  "teleopAttemptedDeep",
  "teleopSuccessfulShallow",
  "teleopSuccessfulDeep",
] as TeamMatchEntryColumn[];
export const TeamMatchEntryInit: TeamMatchEntry = {
  eventKey: "",
  matchLevel: "Qualification",
  matchNumber: 1,
  teamNumber: 0,
  alliance: "Red",
  robotNumber: 1,
  deviceTeamNumber: 0,
  deviceId: "",
  scoutTeamNumber: 0,
  scoutName: "",
  flag: "",

  noShow: false,
  startingLocationA: false,
  startingLocationB: false,
  startingLocationC: false,
  died: false,
  playedDefense: false,
  goodAtCoralL1: false,
  goodAtCoralL2: false,
  goodAtCoralL3: false,
  goodAtCoralL4: false,
  goodAtAlgaeNet: false,
  goodAtAlgaeProcessor: false,
  goodAtClimb: false,
  goodAtDefense: false,
  goodAtWorkingWithAlliance: false,
  goodAtDriving: false,
  goodAtAuto: false,
  removedAlgaeFromReef: false,
  comments: "",

  autoCrossedRSL: false,
  autoCoralAL1: false,
  autoCoralAL2: false,
  autoCoralAL3: false,
  autoCoralAL4: false,
  autoCoralBL1: false,
  autoCoralBL2: false,
  autoCoralBL3: false,
  autoCoralBL4: false,
  autoCoralCL1: false,
  autoCoralCL2: false,
  autoCoralCL3: false,
  autoCoralCL4: false,
  autoCoralDL1: false,
  autoCoralDL2: false,
  autoCoralDL3: false,
  autoCoralDL4: false,
  autoCoralEL1: false,
  autoCoralEL2: false,
  autoCoralEL3: false,
  autoCoralEL4: false,
  autoCoralFL1: false,
  autoCoralFL2: false,
  autoCoralFL3: false,
  autoCoralFL4: false,
  autoCoralGL1: false,
  autoCoralGL2: false,
  autoCoralGL3: false,
  autoCoralGL4: false,
  autoCoralHL1: false,
  autoCoralHL2: false,
  autoCoralHL3: false,
  autoCoralHL4: false,
  autoCoralIL1: false,
  autoCoralIL2: false,
  autoCoralIL3: false,
  autoCoralIL4: false,
  autoCoralJL1: false,
  autoCoralJL2: false,
  autoCoralJL3: false,
  autoCoralJL4: false,
  autoCoralKL1: false,
  autoCoralKL2: false,
  autoCoralKL3: false,
  autoCoralKL4: false,
  autoCoralLL1: false,
  autoCoralLL2: false,
  autoCoralLL3: false,
  autoCoralLL4: false,
  autoProcessor: 0,
  autoNet: 0,

  teleopL1: 0,
  teleopL2: 0,
  teleopL3: 0,
  teleopL4: 0,
  teleopProcessor: 0,
  teleopNet: 0,
  teleopPark: false,
  teleopAttemptedShallow: false,
  teleopAttemptedDeep: false,
  teleopSuccessfulShallow: false,
  teleopSuccessfulDeep: false,
};
export const TeamMatchEntryNoShowInit: TeamMatchEntry = {
  eventKey: "",
  matchLevel: "Qualification",
  matchNumber: 1,
  teamNumber: 0,
  alliance: "Red",
  robotNumber: 1,
  deviceTeamNumber: 0,
  deviceId: "",
  scoutTeamNumber: 0,
  scoutName: "",
  flag: "",

  noShow: true,
  startingLocationA: null,
  startingLocationB: null,
  startingLocationC: null,
  died: null,
  playedDefense: null,
  goodAtCoralL1: null,
  goodAtCoralL2: null,
  goodAtCoralL3: null,
  goodAtCoralL4: null,
  goodAtAlgaeNet: null,
  goodAtAlgaeProcessor: null,
  goodAtClimb: null,
  goodAtDefense: null,
  goodAtWorkingWithAlliance: null,
  goodAtDriving: null,
  goodAtAuto: null,
  removedAlgaeFromReef: null,
  comments: null,

  autoCrossedRSL: null,
  autoCoralAL1: null,
  autoCoralAL2: null,
  autoCoralAL3: null,
  autoCoralAL4: null,
  autoCoralBL1: null,
  autoCoralBL2: null,
  autoCoralBL3: null,
  autoCoralBL4: null,
  autoCoralCL1: null,
  autoCoralCL2: null,
  autoCoralCL3: null,
  autoCoralCL4: null,
  autoCoralDL1: null,
  autoCoralDL2: null,
  autoCoralDL3: null,
  autoCoralDL4: null,
  autoCoralEL1: null,
  autoCoralEL2: null,
  autoCoralEL3: null,
  autoCoralEL4: null,
  autoCoralFL1: null,
  autoCoralFL2: null,
  autoCoralFL3: null,
  autoCoralFL4: null,
  autoCoralGL1: null,
  autoCoralGL2: null,
  autoCoralGL3: null,
  autoCoralGL4: null,
  autoCoralHL1: null,
  autoCoralHL2: null,
  autoCoralHL3: null,
  autoCoralHL4: null,
  autoCoralIL1: null,
  autoCoralIL2: null,
  autoCoralIL3: null,
  autoCoralIL4: null,
  autoCoralJL1: null,
  autoCoralJL2: null,
  autoCoralJL3: null,
  autoCoralJL4: null,
  autoCoralKL1: null,
  autoCoralKL2: null,
  autoCoralKL3: null,
  autoCoralKL4: null,
  autoCoralLL1: null,
  autoCoralLL2: null,
  autoCoralLL3: null,
  autoCoralLL4: null,
  autoProcessor: null,
  autoNet: null,

  teleopL1: null,
  teleopL2: null,
  teleopL3: null,
  teleopL4: null,
  teleopProcessor: null,
  teleopNet: null,
  teleopPark: null,
  teleopAttemptedShallow: null,
  teleopAttemptedDeep: null,
  teleopSuccessfulShallow: null,
  teleopSuccessfulDeep: null,
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
  matchLevel: "Qualification",
  matchNumber: 1,
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
export const UserSchema = z.object({
  username: z.string(),
  permLevel: z.union([
    z.literal("none"),
    z.literal("demo"),
    z.literal("team"),
    z.literal("datamanage"),
    z.literal("admin"),
  ]),
  teamNumber: z.number().int().nonnegative(),
  hashedPassword: z.string(),
});
export type User = z.infer<typeof UserSchema>;
export type UserColumn = keyof User;
export const UserColumns: UserColumn[] = [
  "username",
  "permLevel",
  "teamNumber",
  "hashedPassword",
];

export const DBEventSchema = z.object({
  eventKey: z.string(),
  eventName: z.string(),
});
export type DBEvent = z.infer<typeof DBEventSchema>;
export type DBEventColumn = keyof DBEvent;
export const DBEventColumns: DBEventColumn[] = ["eventKey", "eventName"];

export const MatchSchema = z.object({
  eventKey: z.string(),
  matchLevel: z.union([
    z.literal("None"),
    z.literal("Practice"),
    z.literal("Qualification"),
    z.literal("Playoff"),
  ]),
  matchNumber: z.number().int().nonnegative(),
  red1: z.number().int().nonnegative(),
  red2: z.number().int().nonnegative(),
  red3: z.number().int().nonnegative(),
  blue1: z.number().int().nonnegative(),
  blue2: z.number().int().nonnegative(),
  blue3: z.number().int().nonnegative(),
});
export type Match = z.infer<typeof MatchSchema>;
export type MatchColumn = keyof Match;
export const MatchColumns: MatchColumn[] = [
  "eventKey",
  "matchLevel",
  "matchNumber",
  "red1",
  "red2",
  "red3",
  "blue1",
  "blue2",
  "blue3",
];
