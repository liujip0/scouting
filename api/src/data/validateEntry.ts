import { HumanPlayerEntry, TeamMatchEntry } from "../utils/dbtypes.ts";

export const validateEntry = (entry: TeamMatchEntry | HumanPlayerEntry) => {
  let flags: string[] = [];

  if (entry.robotNumber === 4) {
  } else {
    if (
      //TODO: count auto coral
      entry.autoProcessor + entry.autoNet >
      6
    ) {
      flags.push("More than 6 auto cycles");
    }

    if (entry.playedDefense) {
      if (
        entry.teleopL1 +
          entry.teleopL2 +
          entry.teleopL3 +
          entry.teleopL4 +
          entry.teleopProcessor +
          entry.teleopNet >
        14
      ) {
        flags.push("More than 14 teleop cycles");
      }
    } else {
      if (
        entry.teleopL1 +
          entry.teleopL2 +
          entry.teleopL3 +
          entry.teleopL4 +
          entry.teleopProcessor +
          entry.teleopNet >
        6
      ) {
        flags.push("More than 6 teleop cycles while playing defense");
      }
    }

    if (
      !entry.autoCrossedRSL &&
      //TODO: count auto coral
      entry.autoProcessor + entry.autoNet > 0
    ) {
      flags.push("Scored in auto without crossing RSL");
    }

    //TODO: IQR or modified z-score checks https://discord.com/channels/286174293006745601/372479045633441822/1337423001213341718
  }
};
