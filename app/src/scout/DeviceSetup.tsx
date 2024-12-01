import { Button } from "@mui/material";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type DeviceSetup = {
  setPage: (newValue: ScoutPage) => void;
};
export default function DeviceSetup({ setPage }: DeviceSetup) {
  return (
    <ScoutLayout
      title="Device Setup"
      navButtons={
        <>
          <Button
            onClick={() => {
              setPage("scoutinfo");
            }}
            variant="contained">
            Done
          </Button>
        </>
      }></ScoutLayout>
  );
}
