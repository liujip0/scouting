import { MAX_TEAM_NUMBER } from "@isa2025/api/src/utils/constants.ts";
import {
  Alliance,
  DBEvent,
  HumanPlayerEntry,
  HumanPlayerEntryInit,
  Match,
  TeamMatchEntry,
  TeamMatchEntryInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceSetupObj } from "../setup/DeviceSetup.tsx";
import SavedMatches from "./SavedMatches.tsx";
import ScoutLayout from "./ScoutLayout.tsx";

export type ScoutPage = "scoutlayout" | "savedmatches";
type ScoutProps = {
  deviceSetup: DeviceSetupObj;
  events: (DBEvent & { matches: Match[] })[];
};
export default function Scout({ deviceSetup, events }: ScoutProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      (deviceSetup.fieldOrientation !== "processor" &&
        deviceSetup.fieldOrientation !== "barge") ||
      !deviceSetup.currentEvent ||
      !Number.isInteger(deviceSetup.deviceTeamNumber) ||
      !deviceSetup.deviceTeamNumber ||
      deviceSetup.deviceTeamNumber < 1 ||
      deviceSetup.deviceTeamNumber > MAX_TEAM_NUMBER ||
      !deviceSetup.deviceId ||
      !Alliance.includes(deviceSetup.alliance) ||
      (deviceSetup.robotNumber !== 1 &&
        deviceSetup.robotNumber !== 2 &&
        deviceSetup.robotNumber !== 3 &&
        deviceSetup.robotNumber !== 4)
    ) {
      navigate("/setup");
    }
  }, [deviceSetup, navigate]);

  const [page, setPage] = useState<ScoutPage>("scoutlayout");

  const [match, setMatch] = useState<TeamMatchEntry | HumanPlayerEntry>(() => {
    if (deviceSetup.robotNumber < 4) {
      const newMatch: TeamMatchEntry = {
        ...TeamMatchEntryInit,
        eventKey: deviceSetup.currentEvent,
        alliance: deviceSetup.alliance,
        robotNumber: deviceSetup.robotNumber as 1 | 2 | 3,
        deviceTeamNumber: deviceSetup.deviceTeamNumber,
        deviceId: deviceSetup.deviceId,
      };

      const eventMatches = events.find(
        (event) => event.eventKey === deviceSetup.currentEvent
      )?.matches;
      if (
        eventMatches?.some((x) => x.matchKey === TeamMatchEntryInit.matchKey)
      ) {
        return {
          ...newMatch,
          teamNumber: eventMatches.find(
            (x) => x.matchKey === TeamMatchEntryInit.matchKey
          )![
            (deviceSetup.alliance.toLowerCase() + deviceSetup.robotNumber) as
              | "red1"
              | "red2"
              | "red3"
              | "blue1"
              | "blue2"
              | "blue3"
          ],
        };
      } else {
        return newMatch;
      }
    } else {
      return {
        ...HumanPlayerEntryInit,
        eventKey: deviceSetup.currentEvent,
        alliance: deviceSetup.alliance,
        robotNumber: deviceSetup.robotNumber as 4,
        deviceTeamNumber: deviceSetup.deviceTeamNumber,
        deviceId: deviceSetup.deviceId,
      };
    }
  });

  return {
    scoutlayout: (
      <ScoutLayout
        setPage={setPage}
        match={match}
        setMatch={setMatch}
        events={events}
        deviceSetup={deviceSetup}
      />
    ),
    savedmatches: (
      <SavedMatches
        setPage={setPage}
        match={match}
        setMatch={setMatch}
        events={events}
      />
    ),
  }[page];
}
