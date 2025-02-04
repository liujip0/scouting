import {
  HumanPlayerEntry,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Button } from "@mui/material";
import { putEntry } from "../utils/Idb.ts";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type PostmatchProps = {
  setPage: (value: ScoutPage) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
};
export default function Postmatch({ setPage, match }: PostmatchProps) {
  return (
    <ScoutLayout
      title="Postmatch"
      nowScouting={{
        teamNumber: match.teamNumber,
        alliance: match.alliance,
        robotPosition: match.robotNumber,
      }}
      navButtons={
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setPage("teleop");
            }}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={async () => {
              await putEntry({
                ...match,
                exported: false,
              } as
                | (TeamMatchEntry & { exported: boolean })
                | (HumanPlayerEntry & { exported: boolean }));
              setPage("savedmatches");
            }}>
            Continue
          </Button>
        </>
      }></ScoutLayout>
  );
}
