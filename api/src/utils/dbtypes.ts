export const Alliance = ["Red", "Blue"] as const;
export interface TeamMatchEntry {
  eventKey: string;
  matchKey: string;
  teamNumber: number;
  alliance: (typeof Alliance)[number];
  robotNumber: number;
  deviceTeamNumber: number;
  deviceId: string;
  scoutTeamNumber: number;
  scoutName: string;

  autoNote1: boolean;
  autoNote2: boolean;
  autoNote3: boolean;
  autoNote4: boolean;
  autoNote5: boolean;
  autoNote6: boolean;
  autoNote7: boolean;
  autoNote8: boolean;
  autoLeftStartingZone: boolean;
  autoSpeaker: number;
  autoAmp: number;

  teleopSpeaker: number;
  teleopAmp: number;
  teleopTrap: number;
  teleopPassed: number;
  teleopStolen: number;
  teleopChuteIntake: boolean;
  teleopGroundIntake: boolean;
  teleopEndgame: "parked" | "climbed" | "none";
  teleopSpotlight: number;

  postmatchDriverSkill: number;
  postmatchPlayedDefense: boolean;
  postmatchUnderHeavyDefense: boolean;
}
export const TeamMatchEntryColumns = [
  "eventKey",
  "matchKey",
  "teamNumber",
  "alliance",
  "robotNumber",
  "deviceTeamNumber",
  "deviceId",
  "scoutTeamNumber",
  "scoutName",

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
] as const;
export type TeamMatchEntryColumn = (typeof TeamMatchEntryColumns)[number];
export const TeamMatchEntryInit: TeamMatchEntry = {
  eventKey: "",
  matchKey: "",
  teamNumber: 0,
  alliance: "Red",
  robotNumber: 0,
  deviceTeamNumber: 0,
  deviceId: "",
  scoutTeamNumber: 0,
  scoutName: "",

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
  publicApiToken: string;
};
export const UserColumns = [
  "username",
  "permLevel",
  "hashedPassword",
  "publicApiToken",
] as const;
export type UserColumn = (typeof UserColumns)[number];

export type Event = {
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
