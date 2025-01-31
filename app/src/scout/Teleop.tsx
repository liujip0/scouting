import { Button } from "@mui/material";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type TeleopProps = {
  setPage: (value: ScoutPage) => void;
};
export function Teleop({ setPage }: TeleopProps) {
  return (
    <ScoutLayout
      title="Teleop"
      //TODO: uncomment when match is present as a prop
      // nowScouting={{
      //   teamNumber: match.teamNumber,
      //   alliance: match.alliance,
      //   robotPosition: match.robotNumber,
      // }}
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
