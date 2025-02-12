import {
  DBEvent,
  HumanPlayerEntry,
  Match,
  TeamMatchEntry,
  TeamMatchEntryInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { useEffect, useState } from "react";
import { getFromDBStore, initDB, Stores } from "../utils/idb.ts";
import DeviceSetup from "./devicesetup/DeviceSetup.tsx";
import SavedMatches from "./SavedMatches.tsx";
import ScoutLayout from "./ScoutLayout.tsx";

export type ScoutPage = "devicesetup" | "scoutlayout" | "savedmatches";
export type DeviceSetupObj = {
  deviceTeamNumber: number;
  deviceId: string;
  alliance: TeamMatchEntry["alliance"];
  robotNumber: number;
  currentEvent: string;
  fieldOrientation: "barge" | "processor";
};
export default function Scout() {
  const [deviceSetup, setDeviceSetupState] = useState<DeviceSetupObj>(
    (): DeviceSetupObj => {
      if (localStorage.getItem("deviceSetup") !== null) {
        return JSON.parse(localStorage.getItem("deviceSetup")!);
      }
      localStorage.setItem(
        "deviceSetup",
        JSON.stringify({
          deviceTeamNumber: 0,
          deviceId: "",
          alliance: "Red",
          robotNumber: 1,
          currentEvent: "",
          fieldOrientation: "processor",
        } as DeviceSetupObj)
      );
      return {
        deviceTeamNumber: 0,
        deviceId: "",
        alliance: "Red",
        robotNumber: 1,
        currentEvent: "",
        fieldOrientation: "processor",
      };
    }
  );
  const setDeviceSetup = async (value: DeviceSetupObj) => {
    setDeviceSetupState(value);
    localStorage.setItem("deviceSetup", JSON.stringify(value));
  };
  const [page, setPage] = useState<ScoutPage>("devicesetup");

  const [match, setMatch] = useState<TeamMatchEntry | HumanPlayerEntry>(
    TeamMatchEntryInit
  );
  const [events, setEvents] = useState<(DBEvent & { matches: Match[] })[]>([]);
  useEffect(() => {
    (async () => {
      await initDB();

      const idbEvents: DBEvent[] = await getFromDBStore(Stores.Events);
      const res: (DBEvent & { matches: Match[] })[] = idbEvents.map(
        (event) => ({
          ...event,
          matches: [],
        })
      );

      const idbMatches: Match[] = await getFromDBStore(Stores.Matches);
      idbMatches.forEach((match) => {
        res
          .find((event) => event.eventKey === match.eventKey)
          ?.matches.push(match);
      });

      setEvents(res);
    })();
  }, []);

  return {
    devicesetup: (
      <DeviceSetup
        deviceSetup={deviceSetup}
        setDeviceSetup={setDeviceSetup}
        setPage={setPage}
        events={events}
        setEvents={setEvents}
        match={match}
        setMatch={setMatch}
      />
    ),
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
