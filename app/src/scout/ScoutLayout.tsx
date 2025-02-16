import { MAX_TEAM_NUMBER } from "@isa2025/api/src/utils/constants.ts";
import {
  DBEvent,
  HumanPlayerEntry,
  Match,
  TeamMatchEntry,
  TeamMatchEntryNoShowInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceSetupObj } from "../devicesetup/DeviceSetup.tsx";
import { putEntry } from "../utils/idb.ts";
import { trpc } from "../utils/trpc.ts";
import Human from "./Human.tsx";
import Auto from "./robot/Auto.tsx";
import Postmatch from "./robot/Postmatch.tsx";
import Prematch from "./robot/Prematch.tsx";
import { Teleop } from "./robot/Teleop.tsx";
import { ScoutPage } from "./Scout.tsx";
import { ScoutPageContainer } from "./ScoutPageContainer.tsx";

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
    match.robotNumber === 4 ? "human" : "prematch"
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
  const [scoutNameError, setScoutNameError] = useState("");
  const [scoutTeamNumberError, setScoutTeamNumberError] = useState("");
  const [teamNumberError, setTeamNumberError] = useState("");

  return (
    <ScoutPageContainer
      title={
        match.robotNumber === 4 ?
          "Human Player Data"
        : <Box
            sx={{
              flex: 1,
              borderBottom: 1,
              borderColor: "divider",
              overflowX: "scroll",
            }}>
            <Tabs
              value={matchStage}
              onChange={(_event, value) => {
                if (matchStage === "prematch") {
                  let error = false;

                  if (
                    !events
                      .find((x) => x.eventKey === deviceSetup.currentEvent)
                      ?.matches.some((y) => y.matchKey === match.matchKey)
                  ) {
                    if (
                      matchNumberError !==
                      "Invalid match key. Press Next again to ignore."
                    ) {
                      error = true;
                    }
                    setMatchNumberError(
                      "Invalid match key. Press Next again to ignore."
                    );
                  } else {
                    setMatchNumberError("");
                  }

                  if (!match.scoutName) {
                    error = true;
                    setScoutNameError("Cannot be empty.");
                  } else {
                    setScoutNameError("");
                  }

                  if (
                    !match.scoutTeamNumber ||
                    match.scoutTeamNumber < 0 ||
                    match.scoutTeamNumber > MAX_TEAM_NUMBER
                  ) {
                    error = true;
                    setScoutTeamNumberError("Invalid team number.");
                  } else {
                    setScoutTeamNumberError("");
                  }

                  if (
                    !match.teamNumber ||
                    match.teamNumber < 0 ||
                    match.teamNumber > MAX_TEAM_NUMBER
                  ) {
                    error = true;
                    setTeamNumberError("Invalid team number.");
                  } else {
                    setTeamNumberError("");
                  }

                  if (!error) {
                    setMatchStage(value);
                  }
                } else {
                  setMatchStage(value);
                }
              }}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile>
              <Tab
                label="Prematch"
                value="prematch"
              />
              <Tab
                label="Auto"
                value="auto"
                disabled={match.noShow}
              />
              <Tab
                label="Teleop"
                value="teleop"
                disabled={match.noShow}
              />
              <Tab
                label="Postmatch"
                value="postmatch"
                disabled={match.noShow}
              />
            </Tabs>
          </Box>
      }
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
              switch (matchStage) {
                case "prematch": {
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

                  if (!match.scoutName) {
                    error = true;
                    setScoutNameError("Cannot be empty.");
                  } else {
                    setScoutNameError("");
                  }

                  if (
                    !match.scoutTeamNumber ||
                    match.scoutTeamNumber < 0 ||
                    match.scoutTeamNumber > MAX_TEAM_NUMBER
                  ) {
                    error = true;
                    setScoutTeamNumberError("Invalid team number.");
                  } else {
                    setScoutTeamNumberError("");
                  }

                  if (
                    !match.teamNumber ||
                    match.teamNumber < 0 ||
                    match.teamNumber > MAX_TEAM_NUMBER
                  ) {
                    error = true;
                    setTeamNumberError("Invalid team number.");
                  } else {
                    setTeamNumberError("");
                  }

                  if (!error) {
                    if ((match as TeamMatchEntry).noShow) {
                      putEntries.mutate([
                        {
                          ...TeamMatchEntryNoShowInit,
                          eventKey: match.eventKey,
                          matchKey: match.matchKey,
                          teamNumber: match.teamNumber,
                          alliance: match.alliance,
                          robotNumber: match.robotNumber as 1 | 2 | 3,
                          deviceTeamNumber: match.deviceTeamNumber,
                          deviceId: match.deviceId,
                          scoutTeamNumber: match.scoutTeamNumber,
                          scoutName: match.scoutName,
                          flag: match.flag,
                        },
                      ]);
                    } else {
                      setMatchStage("auto");
                    }
                  }
                  break;
                }
                case "auto": {
                  setMatchStage("teleop");
                  break;
                }
                case "teleop": {
                  setMatchStage("postmatch");
                  break;
                }
                case "postmatch": {
                  if ((match as TeamMatchEntry).noShow) {
                    putEntries.mutate([
                      {
                        ...TeamMatchEntryNoShowInit,
                        eventKey: match.eventKey,
                        matchKey: match.matchKey,
                        teamNumber: match.teamNumber,
                        alliance: match.alliance,
                        robotNumber: match.robotNumber as 1 | 2 | 3,
                        deviceTeamNumber: match.deviceTeamNumber,
                        deviceId: match.deviceId,
                        scoutTeamNumber: match.scoutTeamNumber,
                        scoutName: match.scoutName,
                        flag: match.flag,
                      },
                    ]);
                  } else {
                    putEntries.mutate([match]);
                  }
                  break;
                }
                case "human": {
                  let error = false;

                  if (!match.scoutName) {
                    error = true;
                    setScoutNameError("Cannot be empty.");
                  } else {
                    setScoutNameError("");
                  }

                  if (
                    !match.scoutTeamNumber ||
                    match.scoutTeamNumber < 0 ||
                    match.scoutTeamNumber > MAX_TEAM_NUMBER
                  ) {
                    error = true;
                    setScoutTeamNumberError("Invalid team number.");
                  } else {
                    setScoutTeamNumberError("");
                  }

                  if (
                    !match.teamNumber ||
                    match.teamNumber < 0 ||
                    match.teamNumber > MAX_TEAM_NUMBER
                  ) {
                    error = true;
                    setTeamNumberError("Invalid team number.");
                  } else {
                    setTeamNumberError("");
                  }

                  if (!error) {
                    putEntries.mutate([match]);
                  }
                  break;
                }
              }
            }}>
            {(
              matchStage === "postmatch" ||
              matchStage === "human" ||
              (matchStage === "prematch" && (match as TeamMatchEntry).noShow)
            ) ?
              "Submit"
            : "Next"}
          </Button>
        </>
      }>
      <Stack
        sx={{
          width: 1,
          height: 1,
        }}>
        <Box
          sx={{
            flex: 1,
            overflowY: "scroll",
          }}>
          {
            {
              prematch: (
                <Prematch
                  match={match as TeamMatchEntry}
                  setMatch={setMatch}
                  events={events}
                  deviceSetup={deviceSetup}
                  matchNumberError={matchNumberError}
                  scoutNameError={scoutNameError}
                  scoutTeamNumberError={scoutTeamNumberError}
                  teamNumberError={teamNumberError}
                />
              ),
              auto: (
                <Auto
                  match={match as TeamMatchEntry}
                  setMatch={setMatch}
                  deviceSetup={deviceSetup}
                />
              ),
              teleop: (
                <Teleop
                  match={match as TeamMatchEntry}
                  setMatch={setMatch}
                  deviceSetup={deviceSetup}
                />
              ),
              postmatch: (
                <Postmatch
                  match={match as TeamMatchEntry}
                  setMatch={setMatch}
                />
              ),
              human: (
                <Human
                  match={match as HumanPlayerEntry}
                  setMatch={setMatch}
                  scoutNameError={scoutNameError}
                  scoutTeamNumberError={scoutTeamNumberError}
                  teamNumberError={teamNumberError}
                />
              ),
            }[matchStage]
          }
        </Box>
      </Stack>
    </ScoutPageContainer>
  );
}
