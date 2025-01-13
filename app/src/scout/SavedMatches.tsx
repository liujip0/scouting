import {
  DBEvent,
  HumanPlayerEntry,
  HumanPlayerEntryInit,
  Match,
  TeamMatchEntry,
  TeamMatchEntryInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFromDBStore, Stores } from "../utils/Idb.ts";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type SavedMatchesProps = {
  setPage: (value: ScoutPage) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
  events: (DBEvent & { matches: Match[] })[];
};
export default function SavedMatches({
  setPage,
  match,
  setMatch,
  events,
}: SavedMatchesProps) {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<(TeamMatchEntry | HumanPlayerEntry)[]>(
    []
  );
  useEffect(() => {
    getFromDBStore(Stores.TeamMatchEntry).then((robotMatches) => {
      getFromDBStore(Stores.HumanPlayerEntry).then((humanMatches) => {
        setMatches([
          ...robotMatches.map((x) => ({
            ...x,
            export: false,
          })),
          ...humanMatches.map((x) => ({
            ...x,
            export: false,
          })),
        ]);
      });
    });
  });

  return (
    <ScoutLayout
      title="Saved Matches"
      navButtons={
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setPage("postmatch");
            }}>
            Back
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}>
            Return to Home
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              let newMatchKey = "";

              if (/^qm\d+$/.test(match.matchKey)) {
                newMatchKey =
                  "qm" + (parseInt(match.matchKey.substring(2)) + 1);
              }

              const newMatch: TeamMatchEntry | HumanPlayerEntry = {
                ...(match.robotNumber < 4 ?
                  TeamMatchEntryInit
                : HumanPlayerEntryInit),
                eventKey: match.eventKey,
                alliance: match.alliance,
                robotNumber: match.robotNumber,
              } as TeamMatchEntry | HumanPlayerEntry;

              if (newMatchKey) {
                const eventMatches = events.find(
                  (event) => event.eventKey === match.eventKey
                )?.matches;
                if (eventMatches?.some((x) => x.matchKey === newMatchKey)) {
                  setMatch({
                    ...newMatch,
                    matchKey: newMatchKey,
                    teamNumber: eventMatches.find(
                      (x) => x.matchKey === newMatchKey
                    )![
                      (match.alliance.toLowerCase() + match.robotNumber) as
                        | "red1"
                        | "red2"
                        | "red3"
                        | "blue1"
                        | "blue2"
                        | "blue3"
                    ],
                  });
                } else {
                  setMatch({
                    ...newMatch,
                    matchKey: newMatchKey,
                    teamNumber: 0,
                  });
                }
              } else {
                setMatch({
                  ...newMatch,
                  teamNumber: 0,
                });
              }
              setPage("matchinfo");
            }}>
            Next Match
          </Button>
        </>
      }>
      <Stack
        direction="row"
        sx={{
          width: 1,
          height: 1,
        }}>
        <Stack
          sx={{
            flex: 1,
            overflowY: "scroll",
          }}>
          {matches.map((matchData, index) => (
            <Paper
              key={index}
              sx={{
                margin: 2,
                padding: 2,
              }}>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  matchData.eventKey +
                  "_" +
                  matchData.matchKey +
                  " " +
                  matchData.alliance +
                  "\n" +
                  matchData.robotNumber
                }
              />
            </Paper>
          ))}
        </Stack>
        <Divider orientation="vertical" />
        <Stack
          sx={{
            flex: 1,
          }}></Stack>
      </Stack>
    </ScoutLayout>
  );
}
