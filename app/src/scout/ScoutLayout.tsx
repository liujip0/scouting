import {
  DBEvent,
  HumanPlayerEntry,
  Match,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putEntry } from "../utils/Idb.ts";
import { trpc } from "../utils/Trpc.tsx";
import Auto from "./Auto.tsx";
import Prematch from "./Prematch.tsx";
import { DeviceSetupObj, ScoutPage, ScoutPageContainer } from "./Scout.tsx";
import { Teleop } from "./Teleop.tsx";

export type MatchStage = "prematch" | "auto" | "teleop" | "postmatch" | "human";

type ScoutLayoutProps = {
  setPage: (value: ScoutPage) => void;
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
  events: (DBEvent & { matches: Match[] })[];
  deviceSetup: DeviceSetupObj;
};
export default function ScoutLayout({
  setPage,
  match,
  setMatch,
  events,
  deviceSetup,
}: ScoutLayoutProps) {
  const navigate = useNavigate();

  const [matchStage, setMatchStage] = useState<MatchStage>(
    match.robotNumber === 4 ? "prematch" : "human"
  );

  let putEntriesInterval: NodeJS.Timeout;
  let putEntriesPending = false;
  const putEntries = trpc.data.putEntries.useMutation({
    onMutate() {
      putEntriesPending = true;
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

  const [matchNumberError, setMatchNumberError] = useState("");

  return (
    <ScoutPageContainer
      title="Scout"
      nowScouting={{
        teamNumber: match.teamNumber,
        alliance: match.alliance,
        robotPosition: match.robotNumber,
      }}
      navButtons={
        <>
          <Button
            variant="contained"
            onClick={() => {
              if (matchStage === "prematch" || matchStage === "human") {
                navigate("/");
              } else {
                setMatchStage(
                  {
                    auto: "prematch",
                    teleop: "auto",
                    postmatch: "teleop",
                  }[matchStage] as MatchStage
                );
              }
            }}>
            {matchStage === "prematch" || matchStage === "human" ?
              "Exit"
            : "Back"}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (matchStage === "postmatch" || matchStage === "human") {
                putEntries.mutate([match]);
              } else if (matchStage === "prematch") {
                let error = false;

                if (
                  !events
                    .find((x) => x.eventKey === deviceSetup.currentEvent)
                    ?.matches.some((y) => y.matchKey === match.matchKey)
                ) {
                  if (
                    matchNumberError !==
                    "Invalid match key. Press Continue again to ignore."
                  ) {
                    error = true;
                  }
                  setMatchNumberError(
                    "Invalid match key. Press Continue again to ignore."
                  );
                } else {
                  setMatchNumberError("");
                }

                if (!error) {
                  setMatchStage("auto");
                }
              } else {
                setMatchStage(
                  {
                    auto: "teleop",
                    teleop: "postmatch",
                  }[matchStage] as MatchStage
                );
              }
            }}>
            {matchStage === "postmatch" || matchStage === "human" ?
              "Submit"
            : "Next"}
          </Button>
        </>
      }>
      <Stack
        sx={{
          width: 1,
          height: 1,
          padding: 2,
        }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}>
          <Tabs
            value={matchStage}
            onChange={(_event, value) => {
              setMatchStage(value);
            }}>
            {match.robotNumber === 4 ?
              <></>
            : <>
                <Tab
                  label="Prematch"
                  value="prematch"
                />
                <Tab
                  label="Auto"
                  value="auto"
                />
                <Tab
                  label="Teleop"
                  value="teleop"
                />
                <Tab
                  label="Postmatch"
                  value="postmatch"
                />
              </>
            }
          </Tabs>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "scroll",
          }}>
          {
            {
              prematch: (
                <Prematch
                  match={match}
                  setMatch={setMatch}
                  events={events}
                  deviceSetup={deviceSetup}
                  matchNumberError={matchNumberError}
                />
              ),
              auto: (
                <Auto
                  match={match}
                  setMatch={setMatch}
                />
              ),
              teleop: (
                <Teleop
                  match={match}
                  setMatch={setMatch}
                />
              ),
              postmatch: <></>,
              human: <></>,
            }[matchStage]
          }
        </Box>
      </Stack>
    </ScoutPageContainer>
  );
}
