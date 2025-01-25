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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  lighten,
  List,
  ListItem,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEntry, getFromDBStore, Stores } from "../utils/Idb.ts";
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
      | (TeamMatchEntry & { selected: boolean })
      | (HumanPlayerEntry & { selected: boolean })
    )[]
  >([]);
  useEffect(() => {
    getFromDBStore(Stores.TeamMatchEntry).then((robotMatches) => {
      getFromDBStore(Stores.HumanPlayerEntry).then((humanMatches) => {
        setMatches([
          ...robotMatches.map((x) => ({
            ...x,
            selected: true,
          })),
          ...humanMatches.map((x) => ({
            ...x,
            selected: true,
          })),
        ]);
      });
    });
  }, []);

  const [quickshareFailed, setQuickshareFailed] = useState("");
  const [confirmDeleteMatch, setConfirmDeleteMatch] = useState(false);

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
            Home
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
            padding: 2,
          }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-evenly",
              marginBottom: 2,
            }}
            gap={2}>
            <Button
              onClick={() => {
                if (matches.every((x) => x.selected)) {
                  setMatches(
                    matches.map((x) => ({
                      ...x,
                      selected: false,
                    }))
                  );
                } else {
                  setMatches(
                    matches.map((x) => ({
                      ...x,
                      selected: true,
                    }))
                  );
                }
              }}
              variant="outlined">
              {matches.every((x) => x.selected) ? "Deselect All" : "Select All"}
            </Button>
            <Button
              onClick={() => {
                if (matches.some((x) => x.selected)) {
                  setConfirmDeleteMatch(true);
                }
              }}
              variant="outlined">
              Delete
            </Button>
            <Dialog
              open={confirmDeleteMatch}
              onClose={() => {
                setConfirmDeleteMatch(false);
              }}>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogContent>
                <Stack>
                  <Typography>
                    Are you sure you want to delete the following matches? This
                    canot be undone.
                  </Typography>
                  <List
                    sx={{
                      listStyleType: "disc",
                      paddingLeft: 4,
                    }}>
                    {matches
                      .filter((x) => x.selected)
                      .map((x) => (
                        <ListItem
                          key={
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
                            x.deviceId
                          }
                          sx={{
                            display: "list-item",
                          }}>
                          <Typography>
                            {x.eventKey +
                              "_" +
                              x.matchKey +
                              " " +
                              x.alliance +
                              " " +
                              x.robotNumber}
                          </Typography>
                        </ListItem>
                      ))}
                  </List>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setConfirmDeleteMatch(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    for (let i of matches.filter((x) => x.selected)) {
                      await deleteEntry(i);
                    }
                    setMatches(matches.filter((x) => !x.selected));
                    setConfirmDeleteMatch(false);
                  }}>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
          <Stack
            sx={{
              flex: 1,
              overflowY: "scroll",
            }}
            gap={1}>
            {matches.map((matchData, index) => (
              <Paper
                key={index}
                sx={(theme) => ({
                  padding: 2,
                  borderColor: "primary.main",
                  borderWidth: 2,
                  borderStyle: "solid",
                  backgroundColor: lighten(
                    theme.palette.background.default,
                    0.5
                  ),
                  cursor: "pointer",
                })}
                onClick={() => {
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
                          selected: !x.selected,
                        }
                      : x
                    )
                  );
                }}>
                <FormControlLabel
                  checked={matchData.selected}
                  control={<Checkbox />}
                  label={
                    <Stack>
                      <Typography
                        onClick={(event) => {
                          event.preventDefault();
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
                                  selected: !x.selected,
                                }
                              : x
                            )
                          );
                        }}>
                        {matchData.eventKey + "_" + matchData.matchKey}
                      </Typography>
                      <Typography
                        onClick={(event) => {
                          event.preventDefault();
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
                                  selected: !x.selected,
                                }
                              : x
                            )
                          );
                        }}>
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
                .filter((x) => x.selected)
                .map((x) =>
                  omit("selected", x as unknown as Record<string, unknown>)
                ) as unknown as (TeamMatchEntry | HumanPlayerEntry)[];

              try {
                await navigator.share({
                  title: "ISA Match Data",
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
              } catch (error: any) {
                console.log(error);
                setQuickshareFailed(error.toString() as string);
              }
            }}>
            Share via Quickshare
          </Button>
          <Snackbar
            open={quickshareFailed !== ""}
            autoHideDuration={3000}
            onClose={() => {
              setQuickshareFailed("");
            }}
            message={quickshareFailed}
            action={
              <IconButton
                onClick={() => {
                  setQuickshareFailed("");
                }}>
                <Close
                  sx={{
                    color: "#ffffff",
                  }}
                />
              </IconButton>
            }
          />
          <Button
            variant="outlined"
            onClick={() => {
              const data: (TeamMatchEntry | HumanPlayerEntry)[] = matches
                .filter((x) => x.selected)
                .map((x) =>
                  omit("selected", x as unknown as Record<string, unknown>)
                ) as unknown as (TeamMatchEntry | HumanPlayerEntry)[];

              navigator.clipboard.writeText(JSON.stringify(data));
            }}>
            Copy to Clipboard
          </Button>
          <Button variant="outlined">Share via QR Code</Button>
          <Button
            variant="outlined"
            onClick={() => {
              const data: (TeamMatchEntry | HumanPlayerEntry)[] = matches
                .filter((x) => x.selected)
                .map((x) =>
                  omit("selected", x as unknown as Record<string, unknown>)
                ) as unknown as (TeamMatchEntry | HumanPlayerEntry)[];

              const downloadInterval = setInterval(() => {
                const x = data.pop();
                console.log(x?.matchKey);
                if (!x) {
                  clearInterval(downloadInterval);
                  return;
                }

                const a = document.createElement("a");
                a.setAttribute(
                  "href",
                  URL.createObjectURL(
                    new Blob([JSON.stringify(x)], {
                      type: "text/plain",
                    })
                  )
                );
                a.setAttribute(
                  "download",
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
                    ".txt"
                );
                a.setAttribute("target", "_blank");
                a.click();

                if (data.length <= 0) {
                  clearInterval(downloadInterval);
                }
              }, 300);
            }}>
            Download Data Files
          </Button>
        </Stack>
      </Stack>
    </ScoutLayout>
  );
}
