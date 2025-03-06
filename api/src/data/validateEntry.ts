import { HumanPlayerEntry, TeamMatchEntry } from "../utils/dbtypes.ts";

export const FLAGS = {
  "6ac": "More than 6 auto cycles",
  "14tc": "More than 14 teleop cycles",
  "6tcd": "More than 6 teleop cycles while playing defense",
  rsl: "Scored in auto without crossing RSL",
};
export const validateSingleEntry = (
  entry: TeamMatchEntry | HumanPlayerEntry
) => {
  let flags: (keyof typeof FLAGS)[] = [];

  if (entry.robotNumber === 4) {
  } else if (!entry.noShow) {
    if (
      entry.autoCoralABL1! +
        entry.autoCoralCDL1! +
        entry.autoCoralEFL1! +
        entry.autoCoralGHL1! +
        entry.autoCoralIJL1! +
        entry.autoCoralKLL1! +
        (entry.autoCoralAL2 ? 1 : 0) +
        (entry.autoCoralAL3 ? 1 : 0) +
        (entry.autoCoralAL4 ? 1 : 0) +
        (entry.autoCoralBL2 ? 1 : 0) +
        (entry.autoCoralBL3 ? 1 : 0) +
        (entry.autoCoralBL4 ? 1 : 0) +
        (entry.autoCoralCL2 ? 1 : 0) +
        (entry.autoCoralCL3 ? 1 : 0) +
        (entry.autoCoralCL4 ? 1 : 0) +
        (entry.autoCoralDL2 ? 1 : 0) +
        (entry.autoCoralDL3 ? 1 : 0) +
        (entry.autoCoralDL4 ? 1 : 0) +
        (entry.autoCoralEL2 ? 1 : 0) +
        (entry.autoCoralEL3 ? 1 : 0) +
        (entry.autoCoralEL4 ? 1 : 0) +
        (entry.autoCoralFL2 ? 1 : 0) +
        (entry.autoCoralFL3 ? 1 : 0) +
        (entry.autoCoralFL4 ? 1 : 0) +
        (entry.autoCoralGL2 ? 1 : 0) +
        (entry.autoCoralGL3 ? 1 : 0) +
        (entry.autoCoralGL4 ? 1 : 0) +
        (entry.autoCoralHL2 ? 1 : 0) +
        (entry.autoCoralHL3 ? 1 : 0) +
        (entry.autoCoralHL4 ? 1 : 0) +
        (entry.autoCoralIL2 ? 1 : 0) +
        (entry.autoCoralIL3 ? 1 : 0) +
        (entry.autoCoralIL4 ? 1 : 0) +
        (entry.autoCoralJL2 ? 1 : 0) +
        (entry.autoCoralJL3 ? 1 : 0) +
        (entry.autoCoralJL4 ? 1 : 0) +
        (entry.autoCoralKL2 ? 1 : 0) +
        (entry.autoCoralKL3 ? 1 : 0) +
        (entry.autoCoralKL4 ? 1 : 0) +
        (entry.autoCoralLL2 ? 1 : 0) +
        (entry.autoCoralLL3 ? 1 : 0) +
        (entry.autoCoralLL4 ? 1 : 0) +
        entry.autoProcessor! +
        entry.autoNet! >
      6
    ) {
      flags.push("6ac");
    }

    if (entry.playedDefense) {
      if (
        entry.teleopL1! +
          entry.teleopL2! +
          entry.teleopL3! +
          entry.teleopL4! +
          entry.teleopProcessor! +
          entry.teleopNet! >
        14
      ) {
        flags.push("14tc");
      }
    } else {
      if (
        entry.teleopL1! +
          entry.teleopL2! +
          entry.teleopL3! +
          entry.teleopL4! +
          entry.teleopProcessor! +
          entry.teleopNet! >
        6
      ) {
        flags.push("6tcd");
      }
    }

    if (
      !entry.autoCrossedRSL &&
      (entry.autoCoralABL1! +
        entry.autoCoralCDL1! +
        entry.autoCoralEFL1! +
        entry.autoCoralGHL1! +
        entry.autoCoralIJL1! +
        entry.autoCoralKLL1! +
        entry.autoProcessor! +
        entry.autoNet! >
        0 ||
        entry.autoCoralAL2 ||
        entry.autoCoralAL3 ||
        entry.autoCoralAL4 ||
        entry.autoCoralBL2 ||
        entry.autoCoralBL3 ||
        entry.autoCoralBL4 ||
        entry.autoCoralCL2 ||
        entry.autoCoralCL3 ||
        entry.autoCoralCL4 ||
        entry.autoCoralDL2 ||
        entry.autoCoralDL3 ||
        entry.autoCoralDL4 ||
        entry.autoCoralEL2 ||
        entry.autoCoralEL3 ||
        entry.autoCoralEL4 ||
        entry.autoCoralFL2 ||
        entry.autoCoralFL3 ||
        entry.autoCoralFL4 ||
        entry.autoCoralGL2 ||
        entry.autoCoralGL3 ||
        entry.autoCoralGL4 ||
        entry.autoCoralHL2 ||
        entry.autoCoralHL3 ||
        entry.autoCoralHL4 ||
        entry.autoCoralIL2 ||
        entry.autoCoralIL3 ||
        entry.autoCoralIL4 ||
        entry.autoCoralJL2 ||
        entry.autoCoralJL3 ||
        entry.autoCoralJL4 ||
        entry.autoCoralKL2 ||
        entry.autoCoralKL3 ||
        entry.autoCoralKL4 ||
        entry.autoCoralLL2 ||
        entry.autoCoralLL3 ||
        entry.autoCoralLL4)
    ) {
      flags.push("rsl");
    }

    //TODO: IQR or modified z-score checks https://discord.com/channels/286174293006745601/372479045633441822/1337423001213341718
  }

  return flags.map((flag) => flag + ":_").join(";");
};
