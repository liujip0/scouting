export const TeamMatchEntryColumns = [
  "eventKey",
  "matchKey",
  "teamNumber",
  "alliance",
  "robotNumber",
  "entryVersion",

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
];

export type User = {
  username: string;
  hashedPassword: string;
  saltToken: string;
  permLevel: "demo" | "team" | "datamanage" | "admin";
};
