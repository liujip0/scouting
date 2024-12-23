import {
  Alliance,
  Event,
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
              }}>
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
        </Stack>
      </Stack>
    </ScoutLayout>
  );
}
