import {
  Alliance,
  Event,
  Match,
  MatchColumns,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Delete, Done, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Th } from "../components/Table.tsx";
import { Overwrite } from "../utils/Utils.ts";
import { DeviceSetupObj, ScoutLayout, ScoutPage } from "./Scout.tsx";

type DeviceSetupProps = {
  deviceSetup: DeviceSetupObj;
  setDeviceSetup: (value: DeviceSetupObj) => void;
  setPage: (newValue: ScoutPage) => void;
  events: (Event & { matches: Match[] })[];
};
export default function DeviceSetup({
  deviceSetup,
  setDeviceSetup,
  setPage,
  events,
}: DeviceSetupProps) {
  const [deviceTeamNumberError, setDeviceTeamNumberError] = useState("");
  const [deviceIdError, setDeviceIdError] = useState("");
  const [allianceError, setAllianceError] = useState("");
  const [robotNumberError, setRobotNumberError] = useState("");

  const [createEvent, setCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Event & { matches: Match[] }>({
    eventKey: "",
    eventName: "",
    matches: [],
  });
  const [newMatch, setNewMatch] = useState<
    Overwrite<
      Match,
      {
        red1: string;
        red2: string;
        red3: string;
        blue1: string;
        blue2: string;
        blue3: string;
      }
    >
  >({
    eventKey: "",
    matchKey: "",
    red1: "",
    red2: "",
    red3: "",
    blue1: "",
    blue2: "",
    blue3: "",
  });
  const openCreateEvent = () => {
    setCreateEvent(true);
    setNewEvent({
      eventKey: "",
      eventName: "",
      matches: [],
    });
  };
  const closeCreateEvent = () => {
    setCreateEvent(false);
    setNewEvent({
      eventKey: "",
      eventName: "",
      matches: [],
    });
  };
  const setNewEventMatch = (match: Match) => {
    const newMatches = newEvent.matches.filter(
      (x) => x.matchKey !== match.matchKey
    );
    newMatches.push(match);
    setNewEvent({
      ...newEvent,
      matches: newMatches,
    });
  };

  return (
    <ScoutLayout
      title="Device Setup"
      navButtons={
        <>
          <Button
            onClick={() => {
              let error = false;

              if (!Number.isInteger(deviceSetup.deviceTeamNumber)) {
                setDeviceTeamNumberError("Must be an integer");
                error = true;
              } else if (deviceSetup.deviceTeamNumber <= 0) {
                setDeviceTeamNumberError("Must be greater than 0");
                error = true;
              } else {
                setDeviceTeamNumberError("");
              }

              if (deviceSetup.deviceId === "") {
                setDeviceIdError("Cannot be empty");
                error = true;
              } else {
                setDeviceIdError("");
              }

              if (!Alliance.includes(deviceSetup.alliance)) {
                setAllianceError("Must be 'Red' or 'Blue'");
                error = true;
              } else {
                setAllianceError("");
              }

              if (!Number.isInteger(deviceSetup.robotNumber)) {
                setRobotNumberError("Must be an integer");
                error = true;
              } else if (!(deviceSetup.robotNumber > 0)) {
                setRobotNumberError("Must be greater than 0");
                error = true;
              } else {
                setRobotNumberError("");
              }

              if (!error) {
                setPage("scoutinfo");
              }
            }}
            variant="contained">
            Done
          </Button>
        </>
      }>
      <Stack
        direction="row"
        sx={{
          height: 1,
          width: 1,
        }}>
        <Stack
          sx={{
            flex: 1,
            padding: 2,
          }}
          gap={2}>
          <TextField
            value={deviceSetup.deviceTeamNumber}
            onChange={(event) => {
              setDeviceSetup({
                ...deviceSetup,
                deviceTeamNumber: parseInt(event.currentTarget.value),
              });
            }}
            type="number"
            label="Device Team Number"
            helperText={deviceTeamNumberError || "What team owns this device?"}
            error={deviceTeamNumberError !== ""}
          />
          <TextField
            value={deviceSetup.deviceId}
            onChange={(event) => {
              setDeviceSetup({
                ...deviceSetup,
                deviceId: event.currentTarget.value,
              });
            }}
            type="text"
            label="Device ID"
            helperText={deviceIdError || "Must be unique within each team"}
            error={deviceIdError !== ""}
          />
          <Divider flexItem />
          <TextField
            value={deviceSetup.alliance}
            onChange={(event) => {
              setDeviceSetup({
                ...deviceSetup,
                alliance: event.target.value as TeamMatchEntry["alliance"],
              });
            }}
            select
            label="Alliance"
            helperText={allianceError || "\u200b"}
            error={allianceError !== ""}>
            {Alliance.map((perm) => (
              <MenuItem
                key={perm}
                value={perm}>
                {perm}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={deviceSetup.robotNumber}
            onChange={(event) => {
              setDeviceSetup({
                ...deviceSetup,
                robotNumber: parseInt(event.currentTarget.value),
              });
            }}
            type="number"
            label="Robot Number"
            helperText={robotNumberError || "\u200b"}
            error={robotNumberError !== ""}
          />
        </Stack>
        <Divider
          orientation="vertical"
          flexItem
        />
        <Stack
          sx={{
            flex: 1,
            padding: 2,
          }}
          gap={2}>
          <Stack
            direction="row"
            gap={2}
            sx={{
              width: 1,
            }}>
            <Button
              variant="outlined"
              sx={{
                flex: 1,
              }}>
              Download Event
            </Button>
            <Button
              variant="outlined"
              sx={{
                flex: 1,
              }}
              onClick={openCreateEvent}>
              Create Event
            </Button>
          </Stack>
          <Box
            sx={{
              flex: 1,
            }}>
            <RadioGroup>
              {events.map((event) => (
                <FormControlLabel
                  key={event.eventKey}
                  value={event.eventKey}
                  control={<Radio />}
                  label={event.eventKey}
                />
              ))}
            </RadioGroup>
          </Box>
          <Dialog
            open={createEvent}
            onClose={closeCreateEvent}>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
              <Stack
                sx={{
                  mt: 1,
                }}
                gap={2}>
                <Stack
                  direction="row"
                  gap={2}>
                  <TextField
                    value={newEvent.eventKey}
                    onChange={(event) => {
                      setNewEvent({
                        ...newEvent,
                        eventKey: event.currentTarget.value,
                      });
                      setNewMatch({
                        ...newMatch,
                        eventKey: event.currentTarget.value,
                      });
                    }}
                    label="Event Code"
                  />
                  <TextField
                    value={newEvent.eventName}
                    onChange={(event) => {
                      setNewEvent({
                        ...newEvent,
                        eventName: event.currentTarget.value,
                      });
                    }}
                    label="Event Name"
                  />
                </Stack>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {MatchColumns.map((column) =>
                          column !== "eventKey" ?
                            <Th key={column}>{column}</Th>
                          : <></>
                        )}
                        <Th>Actions</Th>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newEvent.matches.map((match) => (
                        <TableRow key={match.matchKey}>
                          {MatchColumns.map((column) =>
                            column !== "eventKey" ?
                              <TableCell
                                key={column}
                                sx={{
                                  pt: 0.5,
                                  pb: 0.5,
                                }}>
                                {match[column]}
                              </TableCell>
                            : <></>
                          )}
                          <TableCell
                            sx={{
                              padding: 0.5,
                            }}>
                            <Stack direction="row">
                              <IconButton color="primary">
                                <Edit />
                              </IconButton>
                              <IconButton color="primary">
                                <Delete />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        {MatchColumns.map((column) =>
                          column !== "eventKey" ?
                            <TableCell
                              key={column}
                              sx={{
                                padding: 0.5,
                              }}>
                              <TextField
                                value={newMatch[column]}
                                onChange={(event) => {
                                  setNewMatch({
                                    ...newMatch,
                                    [column]: event.currentTarget.value,
                                  });
                                }}
                                slotProps={{
                                  input: {
                                    sx: {
                                      padding: 0,
                                    },
                                  },
                                  htmlInput: {
                                    sx: {
                                      padding: 1,
                                    },
                                  },
                                }}
                              />
                            </TableCell>
                          : <></>
                        )}
                        <TableCell
                          sx={{
                            padding: 0.5,
                          }}>
                          <Stack direction="row">
                            <IconButton
                              onClick={() => {
                                setNewEventMatch({
                                  ...newMatch,
                                  red1: parseInt(newMatch.red1),
                                  red2: parseInt(newMatch.red2),
                                  red3: parseInt(newMatch.red3),
                                  blue1: parseInt(newMatch.blue1),
                                  blue2: parseInt(newMatch.blue2),
                                  blue3: parseInt(newMatch.blue3),
                                });
                                setNewMatch({
                                  eventKey: newEvent.eventKey,
                                  matchKey: "",
                                  red1: "",
                                  red2: "",
                                  red3: "",
                                  blue1: "",
                                  blue2: "",
                                  blue3: "",
                                });
                              }}
                              color="primary">
                              <Done />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeCreateEvent}>Cancel</Button>
              <Button
                onClick={() => {
                  closeCreateEvent();
                }}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>
    </ScoutLayout>
  );
}
