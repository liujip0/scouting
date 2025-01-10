import {
  DBEvent,
  HumanPlayerEntry,
  Match,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceSetupObj, ScoutLayout, ScoutPage } from "./Scout.tsx";

type MatchInfoProps = {
  setPage: (newValue: ScoutPage) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
  events: (DBEvent & { matches: Match[] })[];
  deviceSetup: DeviceSetupObj;
};
export default function MatchInfo({
  setPage,
  match,
  setMatch,
  events,
  deviceSetup,
}: MatchInfoProps) {
  const navigate = useNavigate();

  const [matchNumberError, setMatchNumberError] = useState("");

  return (
    <ScoutLayout
      title="Scout & Match Info"
      nowScouting={{
        teamNumber: 3494,
        alliance: "red",
        robotPosition: 1,
      }}
      navButtons={
        <>
          <Button
            onClick={() => {
              setPage("devicesetup");
            }}
            variant="outlined">
            Device Setup
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="outlined">
            Return to Home
          </Button>
          <Button
            onClick={() => {
              let error = false;

              if (
                !events
                  .find((x) => x.eventKey === deviceSetup.currentEvent)
                  ?.matches.some((y) => y.matchKey === match.matchKey)
              ) {
                if (
                  matchNumberError !==
                  "Invalid match key. Press Continue again to ignore."
                ) {
                  error = true;
                }
                setMatchNumberError(
                  "Invalid match key. Press Continue again to ignore."
                );
              } else {
                setMatchNumberError("");
              }

              if (!error) {
                setPage("auto");
              }
            }}
            variant="contained">
            Continue
          </Button>
        </>
      }>
      <Box
        sx={{
          width: 1,
          height: 1,
          display: "flex",
          pt: 4,
          pb: 4,
        }}>
        <Stack
          sx={{
            flex: 1,
            pl: 4,
            pr: 4,
          }}
          gap={2}>
          <TextField
            value={match.scoutName}
            onChange={(event) => {
              setMatch({
                ...match,
                scoutName: event.currentTarget.value,
              });
            }}
            type="text"
            variant="outlined"
            label="Scout Name & Last Initial"
          />
          <TextField
            value={match.scoutTeamNumber}
            onChange={(event) => {
              setMatch({
                ...match,
                scoutTeamNumber: parseInt(event.currentTarget.value),
              });
            }}
            type="number"
            variant="outlined"
            label="Scout Team Number"
          />
        </Stack>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <Stack
          sx={{
            flex: 1,
            pl: 4,
            pr: 4,
          }}
          gap={2}>
          <TextField
            value={deviceSetup.currentEvent}
            label="Event Code"
            helperText="Edit in Device Setup"
            disabled
            sx={(theme) => {
              return {
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: theme.palette.text.primary,
                  color: theme.palette.text.primary,
                },
              };
            }}
          />
          <TextField
            value={deviceSetup.alliance + " " + deviceSetup.robotNumber}
            label="Position"
            helperText="Edit in Device Setup"
            disabled
            sx={(theme) => {
              return {
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: theme.palette.text.primary,
                  color: theme.palette.text.primary,
                },
              };
            }}
          />
          <TextField
            value={match.matchKey}
            onChange={(event) => {
              setMatch({
                ...match,
                matchKey: event.currentTarget.value,
              });
            }}
            error={matchNumberError !== ""}
            helperText={matchNumberError}
            label="Match Number"
            slotProps={{
              input: {
                startAdornment: (
                  <IconButton
                    onClick={() => {
                      if (/^qm\d+$/.test(match.matchKey)) {
                        setMatch({
                          ...match,
                          matchKey:
                            "qm" + (parseInt(match.matchKey.substring(2)) - 1),
                        });
                      }
                    }}>
                    <Remove />
                  </IconButton>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      if (/^qm\d+$/.test(match.matchKey)) {
                        setMatch({
                          ...match,
                          matchKey:
                            "qm" + (parseInt(match.matchKey.substring(2)) + 1),
                        });
                      }
                    }}>
                    <Add />
                  </IconButton>
                ),
              },
            }}
          />
          <TextField
            label="Robot Team Number"
            value={match.teamNumber}
            onChange={(event) => {
              setMatch({
                ...match,
                teamNumber: parseInt(event.currentTarget.value),
              });
            }}
          />
        </Stack>
      </Box>
    </ScoutLayout>
  );
}
