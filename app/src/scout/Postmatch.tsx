import {
  DBEvent,
  HumanPlayerEntry,
  HumanPlayerEntryInit,
  Match,
  TeamMatchEntry,
  TeamMatchEntryInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { putHumanPlayerEntry, putTeamMatchEntry } from "../utils/Idb.ts";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type PostmatchProps = {
  setPage: (value: ScoutPage) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
  events: (DBEvent & { matches: Match[] })[];
};
export default function Postmatch({
  setPage,
  match,
  setMatch,
  events,
}: PostmatchProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (match.robotNumber < 4) {
      putTeamMatchEntry(match as TeamMatchEntry);
    } else {
      putHumanPlayerEntry(match as HumanPlayerEntry);
    }
  }, [match]);

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
      }></ScoutLayout>
  );
}
