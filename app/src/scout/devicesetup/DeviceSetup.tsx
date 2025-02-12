import {
  Alliance,
  DBEvent,
  HumanPlayerEntry,
  HumanPlayerEntryInit,
  Match,
  TeamMatchEntry,
  TeamMatchEntryInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { omit } from "@isa2025/api/src/utils/utils.ts";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VisuallyHiddenInput } from "../../components/VisuallyHiddenInput.tsx";
import { putDBEvent, putDBMatches } from "../../utils/idb.ts";
import { DeviceSetupObj, ScoutPage } from "../Scout.tsx";
import { ScoutPageContainer } from "../ScoutPageContainer.tsx";
import DownloadEvent from "./DownloadEvent.tsx";

type DeviceSetupProps = {
  deviceSetup: DeviceSetupObj;
  setDeviceSetup: (value: DeviceSetupObj) => void;
  setPage: (newValue: ScoutPage) => void;
  events: (DBEvent & { matches: Match[] })[];
  setEvents: (value: (DBEvent & { matches: Match[] })[]) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
};
export default function DeviceSetup({
  deviceSetup,
  setDeviceSetup,
  setPage,
  events,
  setEvents,
  match,
  setMatch,
}: DeviceSetupProps) {
  const navigate = useNavigate();

  const [deviceTeamNumberError, setDeviceTeamNumberError] = useState("");
  const [deviceIdError, setDeviceIdError] = useState("");
  const [allianceError, setAllianceError] = useState("");
  const [robotNumberError, setRobotNumberError] = useState("");
  const [currentEventError, setCurrentEventError] = useState("");

  // const [createEvent, setCreateEvent] = useState(false);
  // const openCreateEvent = () => {
  //   setCreateEvent(true);
  // };

  // const putEvents = trpc.events.putEvents.useMutation();

  const [downloadEvent, setDownloadEvent] = useState(false);

  const [status, setStatus] = useState("");

  return (
    <ScoutPageContainer
      title="Device Setup"
      navButtons={
        <>
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="outlined">
            Exit
          </Button>
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
              } else if (
                deviceSetup.robotNumber < 1 ||
                deviceSetup.robotNumber > 4
              ) {
                setRobotNumberError("Must be between 1 and 4");
                error = true;
              } else {
                setRobotNumberError("");
              }

              if (deviceSetup.currentEvent === "") {
                setCurrentEventError("Please select an event");
                error = true;
              } else {
                setCurrentEventError("");
              }

              if (!error) {
                if (deviceSetup.robotNumber < 4) {
                  const newMatch: TeamMatchEntry = {
                    ...TeamMatchEntryInit,
                    eventKey: deviceSetup.currentEvent,
                    alliance: deviceSetup.alliance,
                    robotNumber: deviceSetup.robotNumber as 1 | 2 | 3,
                    deviceTeamNumber: deviceSetup.deviceTeamNumber,
                    deviceId: deviceSetup.deviceId,
                  };

                  const eventMatches = events.find(
                    (event) => event.eventKey === deviceSetup.currentEvent
                  )?.matches;
                  if (
                    eventMatches?.some((x) => x.matchKey === match.matchKey)
                  ) {
                    setMatch({
                      ...newMatch,
                      teamNumber: eventMatches.find(
                        (x) => x.matchKey === match.matchKey
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
                    setMatch(newMatch);
                  }
                } else {
                  setMatch({
                    ...HumanPlayerEntryInit,
                    eventKey: deviceSetup.currentEvent,
                    alliance: deviceSetup.alliance,
                    robotNumber: deviceSetup.robotNumber as 4,
                    deviceTeamNumber: deviceSetup.deviceTeamNumber,
                    deviceId: deviceSetup.deviceId,
                  });
                }
                setPage("scoutlayout");
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
        <Snackbar
          open={status !== ""}
          autoHideDuration={3000}
          onClose={() => {
            setStatus("");
          }}
          message={status}
          action={
            <IconButton
              onClick={() => {
                setStatus("");
              }}>
              <Close
                sx={{
                  color: "#ffffff",
                }}
              />
            </IconButton>
          }
        />
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
            helperText={
              robotNumberError || "Set this to 4 to scout human players"
            }
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
            gap={2}>
            <Button
              component="label"
              variant="outlined"
              sx={{
                textAlign: "center",
              }}>
              Upload Schedule
              <VisuallyHiddenInput
                type="file"
                accept="text/csv"
                onChange={async (event) => {
                  try {
                    if (event.currentTarget.files) {
                      for (const file of event.currentTarget.files) {
                        const schedule = (await file.text())
                          .split("\n")
                          .filter((x) => x !== "")
                          .map((x) => x.split(","));
                        console.log(schedule);

                        if (
                          schedule.length < 2 ||
                          schedule.some((x, index) =>
                            index === 0 ? x.length < 2 : x.length < 7
                          )
                        ) {
                          setStatus("Error: Invalid schedule");
                          return;
                        }

                        const newEvent: DBEvent & { matches: Match[] } = {
                          eventKey: schedule[0][0],
                          eventName: schedule[0][1] ?? schedule[0][0],
                          matches: schedule.slice(1).map((x) => ({
                            eventKey: schedule[0][0],
                            eventName: schedule[0][1] ?? schedule[0][0],
                            matchKey: x[0],
                            red1: parseInt(x[1]),
                            red2: parseInt(x[2]),
                            red3: parseInt(x[3]),
                            blue1: parseInt(x[4]),
                            blue2: parseInt(x[5]),
                            blue3: parseInt(x[6]),
                          })),
                        };

                        setEvents([
                          ...events.filter(
                            (event) => event.eventKey !== newEvent.eventKey
                          ),
                          newEvent,
                        ]);
                        putDBEvent(omit("matches", newEvent) as DBEvent);
                        putDBMatches(newEvent.matches);
                      }
                    }
                  } catch (error) {
                    console.log(error);
                    setStatus("Error (see console)");
                  }
                }}
                multiple
              />
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setDownloadEvent(true);
              }}>
              Download Schedule
            </Button>
          </Stack>
          {/* <Stack
            direction="row"
            gap={2}
            sx={{
              width: 1,
            }}>
            <Button
              onClick={() => {
                setDownloadEvent(true);
              }}
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
            <Button
              variant="outlined"
              onClick={() => {
                putEvents.mutate(events);
              }}>
              <CloudUpload />
            </Button>
          </Stack> */}
          <Box
            sx={{
              flex: 1,
              padding: 2,
            }}>
            <FormControl error={currentEventError !== ""}>
              <RadioGroup
                value={deviceSetup.currentEvent}
                onChange={(event) => {
                  setDeviceSetup({
                    ...deviceSetup,
                    currentEvent: event.currentTarget.value,
                  });
                }}>
                {events
                  .sort((a, b) => (a.eventKey < b.eventKey ? -1 : 1))
                  .map((event) => (
                    <FormControlLabel
                      key={event.eventKey}
                      value={event.eventKey}
                      control={<Radio />}
                      label={event.eventKey}
                    />
                  ))}
              </RadioGroup>
              <FormHelperText>{currentEventError}</FormHelperText>
            </FormControl>
          </Box>
          <DownloadEvent
            downloadEvent={downloadEvent}
            setDownloadEvent={setDownloadEvent}
            events={events}
            setEvents={setEvents}
          />
          {/* <CreateEvent
            createEvent={createEvent}
            setCreateEvent={setCreateEvent}
            events={events}
            setEvents={setEvents}
          /> */}
        </Stack>
      </Stack>
    </ScoutPageContainer>
  );
}
