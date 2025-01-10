import { Button } from "@mui/material";
import { ScoutLayout, ScoutPage } from "./Scout";

type TeleopProps = {
  setPage: (value: ScoutPage) => void;
};
export function Teleop({ setPage }: TeleopProps) {
  return (
    <ScoutLayout
      title="Teleop"
      navButtons={
        <>
          <Button
            onClick={() => {
              setPage("auto");
            }}
            variant="outlined">
            Back
          </Button>
          <Button
            onClick={() => {
              setPage("postmatch");
            }}
            variant="contained">
            Continue
          </Button>
        </>
      }></ScoutLayout>
  );
}
