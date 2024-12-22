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
//TODO: vvv
// export const TeamMatchEntryInit= {
//   eventKey: '',
//   matchKey: '',
//   teamNumber: 0,
//   alliance: 'Red',
//   robotNumber: 0,
//   deviceTeamNumber: 0,
//   deviceId: '',
//   scoutTeamNumber: number,
//   scoutName: string,

//   autoNote1: boolean,
//   autoNote2: boolean,
//   autoNote3: boolean,
//   autoNote4: boolean,
//   autoNote5: boolean,
//   autoNote6: boolean,
//   autoNote7: boolean,
//   autoNote8: boolean,
//   autoLeftStartingZone: boolean,
//   autoSpeaker: number,
//   autoAmp: number,

//   teleopSpeaker: number,
//   teleopAmp: number,
//   teleopTrap: number,
//   teleopPassed: number,
//   teleopStolen: number,
//   teleopChuteIntake: boolean,
//   teleopGroundIntake: boolean,
//   teleopEndgame: "parked" | "climbed" | "none",
//   teleopSpotlight: number,

//   postmatchDriverSkill: number,
//   postmatchPlayedDefense: boolean,
//   postmatchUnderHeavyDefense: boolean,
// }

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
