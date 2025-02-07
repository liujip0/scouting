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
  const putEntries = trpc.data.putEntries.useMutation({
    onMutate() {
      setInterval(async () => {
        putEntries.reset();
        await putEntry({
          ...match,
          exported: false,
        } as
          | (TeamMatchEntry & { exported: boolean })
          | (HumanPlayerEntry & { exported: boolean }));
        setPage("savedmatches");
      }, 3000);
    },
    async onSuccess() {
      await putEntry({
        ...match,
        exported: true,
      } as
        | (TeamMatchEntry & { exported: boolean })
        | (HumanPlayerEntry & { exported: boolean }));
      setPage("savedmatches");
    },
    async onError(error) {
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
