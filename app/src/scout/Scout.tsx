import {
  DBEvent,
  HumanPlayerEntry,
  Match,
  TeamMatchEntry,
  TeamMatchEntryInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";
import { GridBorder } from "../components/GridBorder.tsx";
import { getFromDBStore, initDB, Stores } from "../utils/Idb.ts";
import { trpc } from "../utils/Trpc.tsx";
import Auto from "./Auto.tsx";
import DeviceSetup from "./devicesetup/DeviceSetup.tsx";
import MatchInfo from "./MatchInfo.tsx";
import Postmatch from "./Postmatch.tsx";
import { Teleop } from "./Teleop.tsx";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_SERVER_URL + "/api",
    }),
  ],
});

export type ScoutPage =
  | "devicesetup"
  | "matchinfo"
  | "auto"
  | "teleop"
  | "postmatch";
export type DeviceSetupObj = {
  deviceTeamNumber: number;
  deviceId: string;
  alliance: TeamMatchEntry["alliance"];
  robotNumber: number;
  currentEvent: string;
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
        } as DeviceSetupObj)
      );
      return {
        deviceTeamNumber: 0,
        deviceId: "",
        alliance: "Red",
        robotNumber: 1,
        currentEvent: "",
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

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {
          {
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
            matchinfo: (
              <MatchInfo
                setPage={setPage}
                match={match}
                setMatch={setMatch}
                events={events}
                deviceSetup={deviceSetup}
              />
            ),
            auto: <Auto setPage={setPage} />,
            teleop: <Teleop setPage={setPage} />,
            postmatch: (
              <Postmatch
                setPage={setPage}
                match={match}
                setMatch={setMatch}
                events={events}
              />
            ),
          }[page]
        }
      </QueryClientProvider>
    </trpc.Provider>
  );
}

type ScoutLayoutProps = {
  title: string;
  nowScouting?: {
    teamNumber: number;
    alliance: "red" | "blue";
    robotPosition: number;
  };
  navButtons?: React.ReactNode;
  children?: React.ReactNode;
};
export function ScoutLayout({
  title,
  nowScouting,
  navButtons,
  children,
}: ScoutLayoutProps) {
  return (
    <GridBorder>
      <Stack
        sx={{
          width: 1,
          height: 1,
        }}>
        <Stack
          sx={{
            width: 1,
            padding: 2,
          }}
          direction="row">
          <Typography
            variant="h2"
            fontWeight="bold">
            {title.toUpperCase()}
          </Typography>
          {nowScouting && (
            <Chip
              label={
                nowScouting.teamNumber +
                " / " +
                nowScouting.alliance.toUpperCase() +
                " " +
                nowScouting.robotPosition
              }
              sx={{
                backgroundColor:
                  nowScouting.alliance === "blue" ? "#0000ff" : "#ff0000",
                color: "white",
                ml: "auto",
                fontSize: "large",
                height: 1,
              }}
            />
          )}
        </Stack>
        <Box
          sx={{
            width: 1,
            flex: 1,
            overflowY: "scroll",
          }}>
          {children}
        </Box>
        <Stack
          sx={{
            padding: 4,
            justifyContent: "right",
          }}
          direction="row"
          gap={3}>
          {navButtons}
        </Stack>
      </Stack>
    </GridBorder>
  );
}
