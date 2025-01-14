import {
  DBEvent,
  HumanPlayerEntry,
  HumanPlayerEntryInit,
  Match,
  TeamMatchEntry,
  TeamMatchEntryInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Close } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFromDBStore, Stores } from "../utils/Idb.ts";
import { omit } from "../utils/Utils.ts";
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

  const [matches, setMatches] = useState<
    (
      | (TeamMatchEntry & { export: boolean })
      | (HumanPlayerEntry & { export: boolean })
    )[]
  >([]);
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
  }, []);

  const [quickshareFailed, setQuickshareFailed] = useState(false);

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
          }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-evenly",
            }}>
            <Button
              onClick={() => {
                if (matches.every((x) => x.export)) {
                  setMatches(
                    matches.map((x) => ({
                      ...x,
                      export: false,
                    }))
                  );
                } else {
                  setMatches(
                    matches.map((x) => ({
                      ...x,
                      export: true,
                    }))
                  );
                }
              }}>
              {matches.every((x) => x.export) ? "Deselect All" : "Select All"}
            </Button>
            <Button>Delete</Button>
          </Stack>
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
                  borderColor: "primary.main",
                  borderWidth: 2,
                  borderStyle: "solid",
                }}>
                <FormControlLabel
                  checked={matchData.export}
                  onChange={(_event, checked) => {
                    setMatches(
                      matches.map((x) =>
                        (
                          x.eventKey === matchData.eventKey &&
                          x.matchKey === matchData.matchKey &&
                          x.alliance === matchData.alliance &&
                          x.robotNumber === matchData.robotNumber
                        ) ?
                          {
                            ...matchData,
                            export: checked,
                          }
                        : x
                      )
                    );
                  }}
                  control={<Checkbox />}
                  label={
                    <Stack>
                      <Typography>
                        {matchData.eventKey + "_" + matchData.matchKey}
                      </Typography>
                      <Typography>
                        {"\n" +
                          matchData.alliance +
                          "\u00a0" +
                          matchData.robotNumber}
                      </Typography>
                    </Stack>
                  }
                />
              </Paper>
            ))}
          </Stack>
        </Stack>
        <Divider orientation="vertical" />
        <Stack
          sx={{
            flex: 1,
            padding: 2,
          }}
          gap={2}>
          <Button
            variant="outlined"
            onClick={async () => {
              const data: (TeamMatchEntry | HumanPlayerEntry)[] = matches
                .filter((x) => x.export)
                .map((x) =>
                  omit("export", x as unknown as Record<string, unknown>)
                ) as unknown as (TeamMatchEntry | HumanPlayerEntry)[];

              try {
                await navigator.share({
                  text: JSON.stringify(data),
                  files: data.map(
                    (x) =>
                      new File(
                        [JSON.stringify(x)],
                        "ISA_" +
                          x.eventKey +
                          "_" +
                          x.matchKey +
                          "_" +
                          x.alliance +
                          "_" +
                          x.robotNumber +
                          "_" +
                          x.deviceTeamNumber +
                          "_" +
                          x.deviceId +
                          ".txt",
                        { type: "text/plain" }
                      )
                  ),
                });
              } catch (error) {
                console.log(error);
                setQuickshareFailed(true);
              }
            }}>
            Share via Quickshare
          </Button>
          <Snackbar
            open={quickshareFailed}
            autoHideDuration={3000}
            onClose={() => {
              setQuickshareFailed(false);
            }}
            message={"Your browser does not support navigator.share()"}
            action={
              <IconButton
                onClick={() => {
                  setQuickshareFailed(false);
                }}>
                <Close />
              </IconButton>
            }
          />
          <Button
            variant="outlined"
            onClick={() => {
              const data: (TeamMatchEntry | HumanPlayerEntry)[] = matches
                .filter((x) => x.export)
                .map((x) =>
                  omit("export", x as unknown as Record<string, unknown>)
                ) as unknown as (TeamMatchEntry | HumanPlayerEntry)[];

              navigator.clipboard.writeText(JSON.stringify(data));
            }}>
            Share via Clipboard
          </Button>
          <Button variant="outlined">Share via QR Code</Button>
        </Stack>
      </Stack>
    </ScoutLayout>
  );
}
