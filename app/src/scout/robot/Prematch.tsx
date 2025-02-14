import {
  DBEvent,
  Match,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Add, Remove } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, TextField } from "@mui/material";
import { StyledRedToggleButton } from "../../components/StyledToggleButton.tsx";
import { CircleToggle } from "../Components.tsx";
import { DeviceSetupObj } from "../Scout.tsx";
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
          error={scoutTeamNumberError !== ""}
          helperText={scoutTeamNumberError}
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
      <Box
        sx={{
          flex: 1,
          pl: 2,
          pr: 2,
          height: 1,
          // display: "grid",
          // placeItems: "center",
          // gridTemplate: "100% / 100%",
        }}>
        <Box
          sx={{
            position: "relative",
            width: "fit-content",
            height: "fit-content",
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
          <CircleToggle
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
            sx={
              deviceSetup.fieldOrientation === "barge" ?
                {
                  position: "absolute",
                  left: "14%",
                  top: "25%",
                  transform: "translate(-50%, -50%)",
                }
              : {
                  position: "absolute",
                  right: "14%",
                  bottom: "25%",
                  transform: "translate(50%, 50%)",
                }
            }
          />
          <CircleToggle
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
            sx={
              deviceSetup.fieldOrientation === "barge" ?
                {
                  position: "absolute",
                  left: "14%",
                  top: "53%",
                  transform: "translate(-50%, -50%)",
                }
              : {
                  position: "absolute",
                  right: "14%",
                  bottom: "53%",
                  transform: "translate(50%, 50%)",
                }
            }
          />
          <CircleToggle
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
            sx={
              deviceSetup.fieldOrientation === "barge" ?
                {
                  position: "absolute",
                  left: "14%",
                  bottom: "18%",
                  transform: "translate(-50%, 50%)",
                }
              : {
                  position: "absolute",
                  right: "14%",
                  top: "18%",
                  transform: "translate(50%, -50%)",
                }
            }
          />
        </Box>
      </Box>
    </Stack>
  );
}
