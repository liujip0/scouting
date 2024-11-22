import Button from "@mui/material/Button";
import { ScoutPage } from "../common/Types.tsx";
import { ScoutLayout, ScoutNavButtonContainer } from "./Scout.tsx";

type DeviceSetup = {
  setPage: (newValue: ScoutPage) => void;
};
export default function DeviceSetup({ setPage }: DeviceSetup) {
  return (
    <ScoutLayout title="Device Setup">
      <ScoutNavButtonContainer>
        <Button
          onClick={() => {
            setPage("scoutinfo");
          }}
          variant="contained">
          Done
        </Button>
      </ScoutNavButtonContainer>
    </ScoutLayout>
  );
}
