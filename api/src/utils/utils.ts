import { HumanPlayerEntry, MatchLevel, TeamMatchEntry } from "./dbtypes.ts";

export type Overwrite<T, NewT> = Omit<T, keyof NewT> & NewT;

export function omit(key: string, obj: Record<string, unknown>) {
  const { [key]: omit, ...newObj } = obj;
  return newObj;
}

export function matchLevelAbbrev(matchLevel: (typeof MatchLevel)[number]) {
  switch (matchLevel) {
    case "None":
      return "n";
    case "Practice":
      return "p";
    case "Qualification":
      return "q";
    case "Playoff":
      return "p";
  }
}

export function generateFileName(match: TeamMatchEntry | HumanPlayerEntry) {
  return (
    "ISA_" +
    match.eventKey +
    "_" +
    matchLevelAbbrev(match.matchLevel) +
    match.matchNumber +
    "_" +
    match.alliance +
    "_" +
    match.robotNumber +
    "_" +
    match.deviceTeamNumber +
    "_" +
    match.deviceId
  );
}
