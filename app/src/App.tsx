import { DBEvent, Match } from "@isa2025/api/src/utils/dbtypes.ts";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Data from "./data/Data.tsx";
import DeviceSetup, { DeviceSetupObj } from "./devicesetup/DeviceSetup.tsx";
import LandingPage from "./LandingPage.tsx";
import Scout from "./scout/Scout.tsx";
import Upload from "./upload/Upload.tsx";
import { getFromDBStore, initDB, Stores } from "./utils/idb.ts";

export default function App() {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/data/*"
          element={<Data />}
        />
        <Route
          path="/scout"
          element={
            <Scout
              deviceSetup={deviceSetup}
              events={events}
            />
          }
        />
        <Route
          path="/setup"
          element={
            <DeviceSetup
              deviceSetup={deviceSetup}
              setDeviceSetup={setDeviceSetup}
              events={events}
              setEvents={setEvents}
            />
          }
        />
        <Route
          path="/upload"
          element={<Upload />}
        />
      </Routes>
    </BrowserRouter>
  );
}
