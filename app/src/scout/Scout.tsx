import { TeamMatchEntry } from "@isa2025/api/src/dbtypes.ts";
import { Box, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { GridBorder } from "../components/GridBorder.tsx";
import Auto from "./Auto.tsx";
import DeviceSetup from "./DeviceSetup.tsx";
import ScoutInfo from "./ScoutInfo.tsx";

export type ScoutPage = "devicesetup" | "scoutinfo" | "auto" | "teleop";
export type DeviceSetupObj = {
  deviceTeamNumber: number;
  deviceId: string;
  alliance: TeamMatchEntry["alliance"];
  robotNumber: number;
};
export default function Scout() {
  const [deviceSetup, setDeviceSetupState] = useState<DeviceSetupObj>(
    (): DeviceSetupObj => {
      if (localStorage.getItem("deviceSetup") !== null) {
        console.log(localStorage.getItem("deviceSetup"));
        return JSON.parse(localStorage.getItem("deviceSetup")!);
      }
      localStorage.setItem(
        "deviceSetup",
        JSON.stringify({
          deviceTeamNumber: 0,
          deviceId: "",
          alliance: "Red",
          robotNumber: 1,
        })
      );
      return {
        deviceTeamNumber: 0,
        deviceId: "",
        alliance: "Red",
        robotNumber: 1,
      };
    }
  );
  const setDeviceSetup = async (value: DeviceSetupObj) => {
    setDeviceSetupState(value);
    localStorage.setItem("deviceSetup", JSON.stringify(value));
  };
  const [page, setPage] = useState<ScoutPage>("devicesetup");

  switch (page) {
    case "devicesetup": {
      return (
        <DeviceSetup
          deviceSetup={deviceSetup}
          setDeviceSetup={setDeviceSetup}
          setPage={setPage}
        />
      );
    }
    case "scoutinfo": {
      return <ScoutInfo setPage={setPage} />;
    }
    case "auto": {
      return <Auto setPage={setPage} />;
    }
  }
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
      <Box
        sx={{
          width: 1,
          height: 1,
          display: "flex",
          flexDirection: "column",
        }}>
        <Box
          sx={{
            width: 1,
            display: "flex",
            padding: 2,
          }}>
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
        </Box>
        <Box
          sx={{
            width: 1,
            flex: 1,
          }}>
          {children}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            padding: 4,
            justifyContent: "right",
          }}>
          {navButtons}
        </Box>
      </Box>
    </GridBorder>
  );
}
