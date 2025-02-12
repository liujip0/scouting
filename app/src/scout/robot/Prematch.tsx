import {
  DBEvent,
  HumanPlayerEntry,
  Match,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Add, Remove } from "@mui/icons-material";
import { Divider, IconButton, Stack, TextField } from "@mui/material";
import { DeviceSetupObj } from "../Scout.tsx";

type PrematchProps = {
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
  events: (DBEvent & { matches: Match[] })[];
  deviceSetup: DeviceSetupObj;
  matchNumberError: string;
};
export default function Prematch({
  match,
  setMatch,
  events,
  deviceSetup,
  matchNumberError,
}: PrematchProps) {
  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        height: 1,
        pt: 2,
      }}>
      <Stack
        sx={{
          flex: 1,
          pl: 2,
          pr: 2,
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
        <TextField
          value={match.matchKey}
          onChange={(event) => {
            const eventMatches = events.find(
              (event) => event.eventKey === deviceSetup.currentEvent
            )?.matches;
            if (
              eventMatches?.some(
                (x) => x.matchKey === event.currentTarget.value
              )
            ) {
              setMatch({
                ...match,
                matchKey: event.currentTarget.value,
                teamNumber: eventMatches.find(
                  (x) => x.matchKey === event.currentTarget.value
                )![
                  (deviceSetup.alliance.toLowerCase() +
                    deviceSetup.robotNumber) as
                    | "red1"
                    | "red2"
                    | "red3"
                    | "blue1"
                    | "blue2"
                    | "blue3"
                ],
              });
            } else {
              setMatch({
                ...match,
                matchKey: event.currentTarget.value,
                teamNumber: 0,
              });
            }
          }}
          error={matchNumberError !== ""}
          helperText={matchNumberError}
          label="Match Number"
          slotProps={{
            input: {
              startAdornment: (
                <IconButton
                  onClick={() => {
                    let newMatchKey = "";

                    if (/^qm\d+$/.test(match.matchKey)) {
                      newMatchKey =
                        "qm" + (parseInt(match.matchKey.substring(2)) - 1);
                    }

                    if (newMatchKey) {
                      const eventMatches = events.find(
                        (event) => event.eventKey === deviceSetup.currentEvent
                      )?.matches;
                      if (
                        eventMatches?.some((x) => x.matchKey === newMatchKey)
                      ) {
                        setMatch({
                          ...match,
                          matchKey: newMatchKey,
                          teamNumber: eventMatches.find(
                            (x) => x.matchKey === newMatchKey
                          )![
                            (deviceSetup.alliance.toLowerCase() +
                              deviceSetup.robotNumber) as
                              | "red1"
                              | "red2"
                              | "red3"
                              | "blue1"
                              | "blue2"
                              | "blue3"
                          ],
                        });
                      } else {
                        setMatch({
                          ...match,
                          matchKey: newMatchKey,
                          teamNumber: 0,
                        });
                      }
                    }
                  }}>
                  <Remove />
                </IconButton>
              ),
              endAdornment: (
                <IconButton
                  onClick={() => {
                    let newMatchKey = "";

                    if (/^qm\d+$/.test(match.matchKey)) {
                      newMatchKey =
                        "qm" + (parseInt(match.matchKey.substring(2)) + 1);
                    }

                    if (newMatchKey) {
                      const eventMatches = events.find(
                        (event) => event.eventKey === deviceSetup.currentEvent
                      )?.matches;
                      if (
                        eventMatches?.some((x) => x.matchKey === newMatchKey)
                      ) {
                        setMatch({
                          ...match,
                          matchKey: newMatchKey,
                          teamNumber: eventMatches.find(
                            (x) => x.matchKey === newMatchKey
                          )![
                            (deviceSetup.alliance.toLowerCase() +
                              deviceSetup.robotNumber) as
                              | "red1"
                              | "red2"
                              | "red3"
                              | "blue1"
                              | "blue2"
                              | "blue3"
                          ],
                        });
                      } else {
                        setMatch({
                          ...match,
                          matchKey: newMatchKey,
                          teamNumber: 0,
                        });
                      }
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
        gap={2}></Stack>
    </Stack>
  );
}
