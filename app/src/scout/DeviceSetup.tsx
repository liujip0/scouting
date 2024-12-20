import { Alliance, TeamMatchEntry } from "@isa2025/api/src/dbtypes.ts";
import { Button, Divider, MenuItem, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { DeviceSetupObj, ScoutLayout, ScoutPage } from "./Scout.tsx";

type DeviceSetupProps = {
  deviceSetup: DeviceSetupObj;
  setDeviceSetup: (value: DeviceSetupObj) => void;
  setPage: (newValue: ScoutPage) => void;
};
export default function DeviceSetup({
  deviceSetup,
  setDeviceSetup,
  setPage,
}: DeviceSetupProps) {
  const [deviceTeamNumberError, setDeviceTeamNumberError] = useState("");
  const [deviceIdError, setDeviceIdError] = useState("");
  const [allianceError, setAllianceError] = useState("");
  const [robotNumberError, setRobotNumberError] = useState("");

  return (
    <ScoutLayout
      title="Device Setup"
      navButtons={
        <>
          <Button
            onClick={() => {
              if (!Number.isInteger(deviceSetup.deviceTeamNumber)) {
                setDeviceTeamNumberError("Not an integer");
              } else if (!(deviceSetup.deviceTeamNumber > 0)) {
                setDeviceTeamNumberError("Not greater than 0");
              } else {
                setDeviceTeamNumberError("");
              }

              if (deviceSetup.deviceId === "") {
                setDeviceIdError("Cannot be empty");
              } else {
                setDeviceIdError("");
              }

              if (!Alliance.includes(deviceSetup.alliance)) {
                setAllianceError("Must be 'Red' or 'Blue'");
              } else {
                setAllianceError("");
              }

              if (!Number.isInteger(deviceSetup.robotNumber)) {
                setRobotNumberError("Not an integer");
              } else if (!(deviceSetup.robotNumber > 0)) {
                setRobotNumberError("Not greater than 0");
              } else {
                setRobotNumberError("");
              }

              console.log(
                deviceTeamNumberError ||
                  deviceIdError ||
                  allianceError ||
                  robotNumberError
              );
              if (
                deviceTeamNumberError !==''&&
                deviceIdError !==''&&
                allianceError!=='' &&
                robotNumberError!==''
              ) {
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
      </Stack>
    </ScoutLayout>
  );
}
