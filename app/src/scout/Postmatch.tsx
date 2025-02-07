import {
  HumanPlayerEntry,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Button } from "@mui/material";
import { putEntry } from "../utils/Idb.ts";
import { trpc } from "../utils/Trpc.tsx";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type PostmatchProps = {
  setPage: (value: ScoutPage) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
};
export default function Postmatch({ setPage, match }: PostmatchProps) {
  let putEntriesInterval: NodeJS.Timeout;
  let putEntriesPending = false;
  const putEntries = trpc.data.putEntries.useMutation({
    onMutate() {
      putEntriesInterval = setTimeout(async () => {
        if (putEntriesPending) {
          putEntries.reset();
          await putEntry({
            ...match,
            exported: false,
          } as
            | (TeamMatchEntry & { exported: boolean })
            | (HumanPlayerEntry & { exported: boolean }));
          setPage("savedmatches");
        }
      }, 3000);
    },
    async onSuccess() {
      putEntriesPending = true;
      clearTimeout(putEntriesInterval);
      await putEntry({
        ...match,
        exported: true,
      } as
        | (TeamMatchEntry & { exported: boolean })
        | (HumanPlayerEntry & { exported: boolean }));
      setPage("savedmatches");
    },
    async onError(error) {
      putEntriesPending = true;
      clearTimeout(putEntriesInterval);
      console.error(error);
      await putEntry({
        ...match,
        exported: false,
      } as
        | (TeamMatchEntry & { exported: boolean })
        | (HumanPlayerEntry & { exported: boolean }));
      setPage("savedmatches");
    },
  });

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
              putEntries.mutate([match]);
            }}>
            Continue
          </Button>
        </>
      }></ScoutLayout>
  );
}
