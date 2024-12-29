import {
  Alliance,
  DBEvent,
  Match,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { putDBEvent, putDBMatches } from "../../utils/Idb.ts";
import { DeviceSetupObj, ScoutLayout, ScoutPage } from "../Scout.tsx";
import CreateEvent from "./CreateEvent.tsx";

type DeviceSetupProps = {
  deviceSetup: DeviceSetupObj;
  setDeviceSetup: (value: DeviceSetupObj) => void;
  setPage: (newValue: ScoutPage) => void;
  events: (DBEvent & { matches: Match[] })[];
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
  const openCreateEvent = () => {
    setCreateEvent(true);
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
              padding: 2,
            }}>
            <RadioGroup>
              {events.map((event) => (
                <FormControlLabel
                  key={event.eventKey}
                  value={event.eventKey}
                  control={<Radio />}
                  label={event.eventKey + " (" + event.eventName + ")"}
                />
              ))}
            </RadioGroup>
          </Box>
          <CreateEvent
            createEvent={createEvent}
            setCreateEvent={setCreateEvent}
          />
        </Stack>
      </Stack>
    </ScoutLayout>
  );
}
