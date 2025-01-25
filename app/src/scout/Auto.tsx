import { Button, Stack, TextField, Typography } from "@mui/material";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type AutoProps = {
  setPage: (value: ScoutPage) => void;
};
export default function Auto({ setPage }: AutoProps) {
  return (
    <ScoutLayout
      title="Auto"
      navButtons={
        <>
          <Button
            onClick={() => {
              setPage("matchinfo");
            }}
            variant="outlined">
            Back
          </Button>
          <Button
            onClick={() => {
              setPage("teleop");
            }}
            variant="contained">
            Continue
          </Button>
        </>
      }>
      {
        //TODO: (For Iraa) Write Auto Layout
        <div
          style={{
            margin: "2px",
            marginBottom: "2px",
          }}></div>
      }
      {/* <Stack
        direction="row"
        sx={{ width: 1, height: 1 }}>
        <Box
          sx={{
            flex: 1,
            // border: "1px solid red",
          }}></Box>
        <Divider orientation="vertical" />
        <Stack
          sx={{
            flex: 1,
            // border: "1px solid purple",
          }}>
          <FormControlLabel
            control={<Switch />}
            label="LEFT THE STARTING ZONE"
            labelPlacement="start"
          />
          <NumberInput label="SPEAKER" />
          <NumberInput label="AMP" />
        </Stack>
      </Stack> */}
    </ScoutLayout>
  );
}

type NumberInputProps = {
  label: string;
};
function NumberInput({ label }: NumberInputProps) {
  return (
    <Stack direction={"row"}>
      <Typography>{label}</Typography>
      <TextField type="number" />
    </Stack>
  );
}
