import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ScoutPage } from "../common/Types.tsx";
import { ScoutLayout, ScoutNavButtonContainer } from "./Scout.tsx";

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
      }}>
      <ScoutNavButtonContainer>
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
          onClick={() => {}}
          variant="contained">
          Continue
        </Button>
      </ScoutNavButtonContainer>
    </ScoutLayout>
  );
}
