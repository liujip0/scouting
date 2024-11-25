import Button from "@mui/material/Button";
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
              setPage("scoutinfo");
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
      }></ScoutLayout>
  );
}
