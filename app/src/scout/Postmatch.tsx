import {
  HumanPlayerEntry,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Button } from "@mui/material";
import { putHumanPlayerEntry, putTeamMatchEntry } from "../utils/Idb.ts";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type PostmatchProps = {
  setPage: (value: ScoutPage) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
};
export default function Postmatch({ setPage, match }: PostmatchProps) {
  return (
    <ScoutLayout
      title="Postmatch"
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
            onClick={() => {
              if (match.robotNumber < 4) {
                putTeamMatchEntry(match as TeamMatchEntry);
              } else {
                putHumanPlayerEntry(match as HumanPlayerEntry);
              }
              setPage("savedmatches");
            }}>
            Continue
          </Button>
        </>
      }></ScoutLayout>
  );
}
