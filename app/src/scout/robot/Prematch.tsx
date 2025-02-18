import {
  DBEvent,
  Match,
  MatchLevel,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormHelperText,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { StyledRedToggleButton } from "../../components/StyledToggleButton.tsx";
import { DeviceSetupObj } from "../../setup/DeviceSetup.tsx";
import { TransparentToggle } from "../Components.tsx";
import BlueBarge from "../images/BlueBarge.png";
import BlueProcessor from "../images/BlueProcessor.png";
import RedBarge from "../images/RedBarge.png";
import RedProcessor from "../images/RedProcessor.png";

type PrematchProps = {
  match: TeamMatchEntry;
  setMatch: (value: TeamMatchEntry) => void;
  events: (DBEvent & { matches: Match[] })[];
  deviceSetup: DeviceSetupObj;
  matchNumberError: string;
  scoutNameError: string;
  scoutTeamNumberError: string;
  teamNumberError: string;
  startingPositionError: string;
};
export default function Prematch({
  match,
  setMatch,
  events,
  deviceSetup,
  matchNumberError,
  scoutNameError,
  scoutTeamNumberError,
  teamNumberError,
  startingPositionError,
}: PrematchProps) {
  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        height: 1,
      }}>
      <Stack
        sx={{
          flex: 1,
          padding: 2,
          overflowY: "scroll",
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
          error={scoutNameError !== ""}
          helperText={scoutNameError}
        />
        <TextField
          value={isNaN(match.scoutTeamNumber) ? "" : match.scoutTeamNumber}
          onChange={(event) => {
            setMatch({
              ...match,
              scoutTeamNumber: parseInt(event.currentTarget.value),
            });
          }}
          variant="outlined"
          label="Scout Team Number"
          error={scoutTeamNumberError !== ""}
          helperText={scoutTeamNumberError}
        />
        <TextField
          select
          value={match.matchLevel}
          label="Match Level"
          onChange={(event) => {
            setMatch({
              ...match,
              matchLevel: event.target.value as (typeof MatchLevel)[number],
            });
          }}>
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Practice">Practice</MenuItem>
          <MenuItem value="Qualification">Qualification</MenuItem>
          <MenuItem value="Playoff">Playoff</MenuItem>
        </TextField>
        <TextField
          value={isNaN(match.matchNumber) ? "" : match.matchNumber}
          onChange={(event) => {
            const eventMatches = events.find(
              (event) => event.eventKey === deviceSetup.currentEvent
            )?.matches;
            if (
              eventMatches?.some(
                (x) =>
                  x.matchNumber === parseInt(event.currentTarget.value) &&
                  x.matchLevel === match.matchLevel
              )
            ) {
              setMatch({
                ...match,
                matchNumber: parseInt(event.currentTarget.value),
                teamNumber: eventMatches.find(
                  (x) =>
                    x.matchNumber === parseInt(event.currentTarget.value) &&
                    x.matchLevel === match.matchLevel
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
                matchNumber: parseInt(event.currentTarget.value),
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
                    if (match.matchNumber > 1) {
                      const eventMatches = events.find(
                        (event) => event.eventKey === deviceSetup.currentEvent
                      )?.matches;
                      if (
                        eventMatches?.some(
                          (x) =>
                            x.matchNumber === match.matchNumber - 1 &&
                            x.matchLevel === match.matchLevel
                        )
                      ) {
                        setMatch({
                          ...match,
                          matchNumber: match.matchNumber - 1,
                          teamNumber: eventMatches.find(
                            (x) =>
                              x.matchNumber === match.matchNumber - 1 &&
                              x.matchLevel === match.matchLevel
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
                          matchNumber: match.matchNumber - 1,
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
                    const eventMatches = events.find(
                      (event) => event.eventKey === deviceSetup.currentEvent
                    )?.matches;
                    if (
                      eventMatches?.some(
                        (x) =>
                          x.matchNumber === match.matchNumber + 1 &&
                          x.matchLevel === match.matchLevel
                      )
                    ) {
                      setMatch({
                        ...match,
                        matchNumber: match.matchNumber + 1,
                        teamNumber: eventMatches.find(
                          (x) =>
                            x.matchNumber === match.matchNumber + 1 &&
                            x.matchLevel === match.matchLevel
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
                        matchNumber: match.matchNumber + 1,
                        teamNumber: 0,
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
          value={isNaN(match.teamNumber) ? "" : match.teamNumber}
          onChange={(event) => {
            setMatch({
              ...match,
              teamNumber: parseInt(event.currentTarget.value),
            });
          }}
          error={teamNumberError !== ""}
          helperText={teamNumberError}
        />
        <Divider />
        <StyledRedToggleButton
          value="No Show?"
          selected={match.noShow}
          onChange={() => {
            setMatch({
              ...match,
              noShow: !match.noShow,
            });
          }}>
          No Show
        </StyledRedToggleButton>
      </Stack>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Stack
        sx={{
          flex: 1,
          padding: 2,
          height: 1,
        }}>
        <Box
          sx={{
            height: startingPositionError ? "calc(100% - 2em)" : "100%",
          }}>
          <Box
            sx={{
              aspectRatio: "1700 / 1650",
              maxWidth: "100%",
              maxHeight: "100%",
              position: "relative",
            }}>
            <img
              src={
                match.alliance === "Red" ?
                  deviceSetup.fieldOrientation === "barge" ?
                    RedBarge
                  : RedProcessor
                : deviceSetup.fieldOrientation === "barge" ?
                  BlueBarge
                : BlueProcessor
              }
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            <TransparentToggle
              label="A"
              value={match.startingLocationA!}
              setValue={(value) => {
                if (value) {
                  setMatch({
                    ...match,
                    startingLocationA: value,
                    startingLocationB: false,
                    startingLocationC: false,
                  });
                } else {
                  setMatch({
                    ...match,
                    startingLocationA: value,
                  });
                }
              }}
              disabled={match.noShow}
              error={startingPositionError !== ""}
              sx={
                deviceSetup.fieldOrientation === "barge" ?
                  {
                    left: "8%",
                    top: "13%",
                    width: "20%",
                    height: "27%",
                  }
                : {
                    right: "8%",
                    top: "59%",
                    width: "20%",
                    height: "28%",
                  }
              }
            />
            <TransparentToggle
              label="B"
              value={match.startingLocationB!}
              setValue={(value) => {
                if (value) {
                  setMatch({
                    ...match,
                    startingLocationB: value,
                    startingLocationA: false,
                    startingLocationC: false,
                  });
                } else {
                  setMatch({
                    ...match,
                    startingLocationB: value,
                  });
                }
              }}
              disabled={match.noShow}
              error={startingPositionError !== ""}
              sx={
                deviceSetup.fieldOrientation === "barge" ?
                  {
                    left: "8%",
                    top: "40%",
                    width: "20%",
                    height: "27%",
                  }
                : {
                    right: "8%",
                    top: "32%",
                    width: "20%",
                    height: "27%",
                  }
              }
            />
            <TransparentToggle
              label="C"
              value={match.startingLocationC!}
              setValue={(value) => {
                if (value) {
                  setMatch({
                    ...match,
                    startingLocationC: value,
                    startingLocationA: false,
                    startingLocationB: false,
                  });
                } else {
                  setMatch({
                    ...match,
                    startingLocationC: value,
                  });
                }
              }}
              disabled={match.noShow}
              error={startingPositionError !== ""}
              sx={
                deviceSetup.fieldOrientation === "barge" ?
                  {
                    left: "8%",
                    top: "67%",
                    width: "20%",
                    height: "27%",
                  }
                : {
                    right: "8%",
                    top: "5%",
                    width: "20%",
                    height: "27%",
                  }
              }
            />
          </Box>
        </Box>
        {startingPositionError && (
          <FormHelperText
            sx={{
              height: "2em",
              border: "1px solid red",
              pl: 1,
              color: "error.main",
              backgroundColor: "white",
            }}>
            {startingPositionError}
          </FormHelperText>
        )}
      </Stack>
    </Stack>
  );
}
