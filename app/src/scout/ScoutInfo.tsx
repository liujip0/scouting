import { Box, Button, Divider, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type ScoutInfoProps = {
  setPage: (newValue: ScoutPage) => void;
};
export default function ScoutInfo({ setPage }: ScoutInfoProps) {
  const navigate = useNavigate();

  return (
    <ScoutLayout
      title="Scout & Match Info"
      nowScouting={{
        teamNumber: 3494,
        alliance: "red",
        robotPosition: 1,
      }}
      navButtons={
        <>
          <Button
            onClick={() => {
              setPage("devicesetup");
            }}
            variant="outlined">
            Device Setup
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="outlined">
            Return to Home
          </Button>
          <Button
            onClick={() => {
              setPage("auto");
            }}
            variant="contained">
            Continue
          </Button>
        </>
      }>
      <Box
        sx={{
          width: 1,
          height: 1,
          display: "flex",
          pt: 4,
          pb: 4,
        }}>
        <Stack
          sx={{
            flex: 1,
            pl: 4,
            pr: 4,
          }}
          gap={2}>
          <TextField
            type="text"
            variant="outlined"
            label="Scout Name & Last Initial"
          />
          <TextField
            type="number"
            variant="outlined"
            label="Scout Team Number"
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
          gap={2}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}>
            <TextField
              type="text"
              variant="outlined"
              label="Event Code"
              disabled
            />
            <Button>Select</Button>
          </Box>
        </Stack>
      </Box>
    </ScoutLayout>
  );
}
