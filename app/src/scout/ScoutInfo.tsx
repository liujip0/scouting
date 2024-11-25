import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { TextFieldLabel } from "../TextFieldLabel.tsx";
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
          padding: 4,
        }}>
        <Box
          sx={{
            flex: 1,
          }}>
          <TextField
            variant="outlined"
            label="Scout Name & Last Initial"
          />
          <TextFieldLabel label="Scout Name & Last Initial:">
            <TextField variant="outlined" />
          </TextFieldLabel>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <Box
          sx={{
            flex: 1,
          }}></Box>
      </Box>
    </ScoutLayout>
  );
}
