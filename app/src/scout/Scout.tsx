import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import {
  borderMarginPx,
  borderWidthPx,
  GridBorder,
} from "../common/Components.tsx";
import { ScoutPage } from "../common/Types.tsx";
import DeviceSetup from "./DeviceSetup.tsx";
import ScoutInfo from "./ScoutInfo.tsx";

export default function Scout() {
  const [page, setPage] = useState<ScoutPage>("scoutinfo");

  switch (page) {
    case "devicesetup": {
      return <DeviceSetup setPage={setPage} />;
    }
    case "scoutinfo": {
      return <ScoutInfo setPage={setPage} />;
    }
  }
}

type ScoutLayoutProps = {
  title: string;
  children?: React.ReactNode;
  nowScouting?: {
    teamNumber: number;
    alliance: "red" | "blue";
    robotPosition: number;
  };
};
export function ScoutLayout({
  title,
  children,
  nowScouting,
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
      </Box>
    </GridBorder>
  );
}

type ScoutNavButtonContainerProps = {
  children: React.ReactNode;
};
export function ScoutNavButtonContainer({
  children,
}: ScoutNavButtonContainerProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        right: `${borderMarginPx + borderWidthPx + 20}px`,
        maxWidth: `calc(100vw - ${2 * (borderMarginPx + borderWidthPx + 20)}px)`,
        bottom: `${borderMarginPx + borderWidthPx + 20}px`,
        display: "flex",
        gap: 2,
      }}>
      {children}
    </Box>
  );
}
