import {
  Alliance,
  DBEvent,
  HumanPlayerEntry,
  HumanPlayerEntryInit,
  Match,
  TeamMatchEntry,
  TeamMatchEntryInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putDBEvent, putDBMatches } from "../../utils/Idb.ts";
import { trpc } from "../../utils/Trpc.tsx";
import { DeviceSetupObj, ScoutLayout, ScoutPage } from "../Scout.tsx";
import CreateEvent from "./CreateEvent.tsx";
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

  const [createEvent, setCreateEvent] = useState(false);
  const openCreateEvent = () => {
    setCreateEvent(true);
  };

  const putEvents = trpc.events.putEvents.useMutation();

  const [downloadEvent, setDownloadEvent] = useState(false);

  return (
    <ScoutLayout
      title="Device Setup"
      navButtons={
        <>
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
                  setMatch({
                    ...TeamMatchEntryInit,
                    eventKey: deviceSetup.currentEvent,
                    alliance: deviceSetup.alliance,
                    robotNumber: deviceSetup.robotNumber as 1 | 2 | 3,
                  });

                  const eventMatches = events.find(
                    (event) => event.eventKey === deviceSetup.currentEvent
                  )?.matches;
                  if (
                    eventMatches?.some((x) => x.matchKey === match.matchKey)
                  ) {
                    setMatch({
                      ...TeamMatchEntryInit,
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
                  }
                } else {
                  setMatch({
                    ...HumanPlayerEntryInit,
                    eventKey: deviceSetup.currentEvent,
                    alliance: deviceSetup.alliance,
                    robotNumber: deviceSetup.robotNumber as 4,
                  });
                }
                setPage("matchinfo");
              }
            }}
            variant="contained">
            Continue
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
            helperText={
              robotNumberError || "Set this to 4 to scout human players"
            }
            error={robotNumberError !== ""}
          />
          <Button
            variant="outlined"
            onClick={() => {
              putDBEvent({
                eventKey: "2025mock1",
                eventName: "2025 mock 1",
              });
              putDBMatches([
                {
                  eventKey: "2025mock1",
                  matchKey: "qm1",
                  red1: 9991,
                  red2: 9992,
                  red3: 9993,
                  blue1: 9994,
                  blue2: 9995,
                  blue3: 9996,
                },
              ]);
            }}>
            Test IDB
          </Button>
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
          </Stack>
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
          <CreateEvent
            createEvent={createEvent}
            setCreateEvent={setCreateEvent}
            events={events}
            setEvents={setEvents}
          />
        </Stack>
      </Stack>
    </ScoutLayout>
  );
}
