import { MAX_TEAM_NUMBER } from "@isa2025/api/src/utils/constants.ts";
import {
  DBEvent,
  HumanPlayerEntry,
  HumanPlayerEntryNoShowInit,
  Match,
  TeamMatchEntry,
  TeamMatchEntryNoShowInit,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import EventEmitter from "events";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceSetupObj } from "../setup/DeviceSetup.tsx";
import { getDBHumanPlayerEntries, putDBEntry } from "../utils/idb.ts";
import { trpc } from "../utils/trpc.ts";
import Human from "./Human.tsx";
import Auto from "./robot/Auto.tsx";
import Postmatch from "./robot/Postmatch.tsx";
import Prematch from "./robot/Prematch.tsx";
import { Teleop } from "./robot/Teleop.tsx";
import { ExportMatchEntry } from "./SavedMatches.tsx";
import { ScoutPageContainer } from "./ScoutPageContainer.tsx";

export type MatchStage = "prematch" | "auto" | "teleop" | "postmatch" | "human";
type ScoutLayoutProps = {
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
  events: (DBEvent & { matches: Match[] })[];
  deviceSetup: DeviceSetupObj;
  putEntriesPending: boolean;
  setPutEntriesPending: (value: boolean) => void;
  eventEmitter: EventEmitter;
};
export default function ScoutLayout({
  match,
  setMatch,
  events,
  deviceSetup,
  putEntriesPending,
  setPutEntriesPending,
  eventEmitter,
}: ScoutLayoutProps) {
  const navigate = useNavigate();

  const [matchStage, setMatchStage] = useState<MatchStage>(
    match.robotNumber === 4 ? "human" : "prematch"
  );
  console.log("match stage: " + matchStage);

  let putEntriesTimeout: NodeJS.Timeout;
  const putEntries = trpc.data.putEntries.useMutation({
    onMutate() {
      clearTimeout(putEntriesTimeout);
      setPutEntriesPending(true);
      putEntriesTimeout = setTimeout(async () => {
        if (putEntriesPending) {
          putEntries.reset();
          await putDBEntry({
            ...match,
            autoUpload: false,
            quickshare: false,
            clipboard: false,
            qr: false,
            download: false,
            upload: false,
          } as ExportMatchEntry);
          navigate("/scout/savedmatches");
        }
      }, 3000);
    },
    async onSuccess() {
      clearTimeout(putEntriesTimeout);
      await putDBEntry({
        ...match,
        autoUpload: true,
        quickshare: false,
        clipboard: false,
        qr: false,
        download: false,
        upload: false,
      } as ExportMatchEntry);
      setPutEntriesPending(false);
      console.log(getDBHumanPlayerEntries());
      navigate("/scout/savedmatches");
    },
    async onError(error) {
      clearTimeout(putEntriesTimeout);
      console.error(error);
      await putDBEntry({
        ...match,
        autoUpload: false,
        quickshare: false,
        clipboard: false,
        qr: false,
        download: false,
        upload: false,
      } as ExportMatchEntry);
      setPutEntriesPending(false);
      navigate("/scout/savedmatches");
    },
  });

  const [matchNumberError, setMatchNumberError] = useState("");
  const [scoutNameError, setScoutNameError] = useState("");
  const [scoutTeamNumberError, setScoutTeamNumberError] = useState("");
  const [teamNumberError, setTeamNumberError] = useState("");
  const [startingPositionError, setStartingPositionError] = useState("");

  const prematchCheck = () => {
    let error = false;

    if (!Number.isInteger(match.matchNumber) || match.matchNumber < 1) {
      error = true;
      setMatchNumberError("Invalid match number.");
    } else if (
      !events
        .find((x) => x.eventKey === deviceSetup.currentEvent)
        ?.matches.some(
          (y) =>
            y.matchNumber === match.matchNumber &&
            y.matchLevel === match.matchLevel
        )
    ) {
      if (
        matchNumberError !==
        "Match not in schedule. Press Next again to ignore."
      ) {
        error = true;
      }
      setMatchNumberError("Match not in schedule. Press Next again to ignore.");
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
      !Number.isInteger(match.scoutTeamNumber) ||
      match.scoutTeamNumber < 1 ||
      match.scoutTeamNumber > MAX_TEAM_NUMBER
    ) {
      error = true;
      setScoutTeamNumberError("Invalid team number.");
    } else {
      setScoutTeamNumberError("");
    }

    if (
      !Number.isInteger(match.teamNumber) ||
      match.teamNumber! < 1 ||
      match.teamNumber! > MAX_TEAM_NUMBER
    ) {
      error = true;
      setTeamNumberError("Invalid team number.");
    } else {
      setTeamNumberError("");
    }

    if (
      !(match as TeamMatchEntry).noShow &&
      !(match as TeamMatchEntry).startingLocationA &&
      !(match as TeamMatchEntry).startingLocationB &&
      !(match as TeamMatchEntry).startingLocationC
    ) {
      error = true;
      setStartingPositionError("Starting position must be selected.");
    } else {
      setStartingPositionError("");
    }

    return error;
  };

  const TELEOP_TAB_FLASH_MS = 750;
  const [teleopTabAnimation, setTeleopTabAnimation] = useState(false);
  const [teleopAnimationBackdrop, setTeleopAnimationBackdrop] = useState(false);
  console.log(teleopTabAnimation, teleopAnimationBackdrop);
  const recurringTeleopAnimation = useRef<NodeJS.Timeout | null>(null);
  const teleopAnimationBackdropTimeout = useRef<NodeJS.Timeout | null>(null);
  const teleopTabAnimation1 = useRef<NodeJS.Timeout | null>(null);
  const teleopTabAnimation2 = useRef<NodeJS.Timeout | null>(null);
  const teleopTabAnimation3 = useRef<NodeJS.Timeout | null>(null);
  const teleopTabAnimation4 = useRef<NodeJS.Timeout | null>(null);
  const teleopTabAnimation5 = useRef<NodeJS.Timeout | null>(null);
  const [teleopAnimationRunning, setTeleopAnimationRunning] = useState(false);
  const clearTeleopAnimations = () => {
    setTeleopAnimationBackdrop(false);
    if (teleopAnimationBackdropTimeout.current) {
      clearInterval(teleopAnimationBackdropTimeout.current);
      teleopAnimationBackdropTimeout.current = null;
    }
    setTeleopTabAnimation(false);
    if (teleopTabAnimation1.current) {
      clearTimeout(teleopTabAnimation1.current);
      teleopTabAnimation1.current = null;
    }
    if (teleopTabAnimation2.current) {
      clearTimeout(teleopTabAnimation2.current);
      teleopTabAnimation2.current = null;
    }
    if (teleopTabAnimation3.current) {
      clearTimeout(teleopTabAnimation3.current);
      teleopTabAnimation3.current = null;
    }
    if (teleopTabAnimation4.current) {
      clearTimeout(teleopTabAnimation4.current);
      teleopTabAnimation4.current = null;
    }
    if (teleopTabAnimation5.current) {
      clearTimeout(teleopTabAnimation5.current);
      teleopTabAnimation5.current = null;
    }

    setTeleopAnimationRunning(false);
  };
  if (eventEmitter.listenerCount("teleop-animation") === 0) {
    eventEmitter.on("teleop-animation", () => {
      console.log("teleop-animation", matchStage);

      if (matchStage !== "auto") {
        console.log("not auto");
        console.log(matchStage);
        clearTeleopAnimations();
        if (recurringTeleopAnimation.current) {
          clearInterval(recurringTeleopAnimation.current);
          recurringTeleopAnimation.current = null;
        }
        return;
      }
      if (teleopAnimationRunning) {
        console.log("teleopAnimationRunning");
        return;
      }
      setTeleopAnimationRunning(true);
      console.log("===========================================");

      setTeleopAnimationBackdrop(true);
      if (!teleopAnimationBackdropTimeout.current) {
        teleopAnimationBackdropTimeout.current = setTimeout(() => {
          setTeleopAnimationBackdrop(false);
          clearTeleopAnimations();
        }, TELEOP_TAB_FLASH_MS * 6);
      }

      setTeleopTabAnimation(true);
      if (!teleopTabAnimation1.current) {
        teleopTabAnimation1.current = setTimeout(() => {
          console.log("teleop-tab-animation-1");
          setTeleopTabAnimation(false);
        }, TELEOP_TAB_FLASH_MS);
      }
      if (!teleopTabAnimation2.current) {
        teleopTabAnimation2.current = setTimeout(() => {
          console.log("teleop-tab-animation-2");
          setTeleopTabAnimation(true);
        }, TELEOP_TAB_FLASH_MS * 2);
      }
      if (!teleopTabAnimation3.current) {
        teleopTabAnimation3.current = setTimeout(() => {
          console.log("teleop-tab-animation-3");
          setTeleopTabAnimation(false);
        }, TELEOP_TAB_FLASH_MS * 3);
      }
      if (!teleopTabAnimation4.current) {
        teleopTabAnimation4.current = setTimeout(() => {
          console.log("teleop-tab-animation-4");
          setTeleopTabAnimation(true);
        }, TELEOP_TAB_FLASH_MS * 4);
      }
      if (!teleopTabAnimation5.current) {
        teleopTabAnimation5.current = setTimeout(() => {
          console.log("teleop-tab-animation-5");
          setTeleopTabAnimation(false);
          clearTeleopAnimations();
        }, TELEOP_TAB_FLASH_MS * 5);
      }

      if (!recurringTeleopAnimation.current) {
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooo");
        recurringTeleopAnimation.current = setInterval(() => {
          console.log("||||||||||||||||||||||||||||||||||||||||||||||||||");
          eventEmitter.emit("teleop-animation");
        }, 5000);
      }
    });
  }

  return (
    <ScoutPageContainer
      backdrop={teleopAnimationBackdrop}
      onCloseBackdrop={() => {
        clearTeleopAnimations();
      }}
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
                clearTeleopAnimations();
                if (recurringTeleopAnimation.current) {
                  clearInterval(recurringTeleopAnimation.current);
                  recurringTeleopAnimation.current = null;
                }

                if (matchStage === "prematch") {
                  if (!prematchCheck()) {
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
                sx={{
                  ...(teleopTabAnimation && {
                    color: "primary.contrastText",
                    backgroundColor: "primary.main",
                  }),
                  transition: "all " + TELEOP_TAB_FLASH_MS + "ms",
                }}
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
        teamNumber: match.teamNumber || 0,
        alliance: match.alliance,
        robotPosition: match.robotNumber,
      }}
      navButtons={
        matchStage === "prematch" ?
          <>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
              }}
              sx={{
                mr: "auto",
              }}>
              Exit
            </Button>
            {(match as TeamMatchEntry).noShow && (
              <Button
                variant="contained"
                onClick={() => {
                  if ((match as TeamMatchEntry).noShow) {
                    setMatch({
                      ...TeamMatchEntryNoShowInit,
                      eventKey: match.eventKey,
                      matchLevel: match.matchLevel,
                      matchNumber: match.matchNumber,
                      teamNumber: match.teamNumber!,
                      alliance: match.alliance,
                      robotNumber: match.robotNumber as 1 | 2 | 3,
                      deviceTeamNumber: match.deviceTeamNumber,
                      deviceId: match.deviceId,
                      scoutTeamNumber: match.scoutTeamNumber,
                      scoutName: match.scoutName,
                      flag: match.flag,
                    });
                    putEntries.mutate([
                      {
                        ...TeamMatchEntryNoShowInit,
                        eventKey: match.eventKey,
                        matchLevel: match.matchLevel,
                        matchNumber: match.matchNumber,
                        teamNumber: match.teamNumber!,
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
                }}>
                Submit
              </Button>
            )}
          </>
        : matchStage === "postmatch" ?
          <Button
            variant="contained"
            onClick={() => {
              if ((match as TeamMatchEntry).noShow) {
                setMatch({
                  ...TeamMatchEntryNoShowInit,
                  eventKey: match.eventKey,
                  matchLevel: match.matchLevel,
                  matchNumber: match.matchNumber,
                  teamNumber: match.teamNumber!,
                  alliance: match.alliance,
                  robotNumber: match.robotNumber as 1 | 2 | 3,
                  deviceTeamNumber: match.deviceTeamNumber,
                  deviceId: match.deviceId,
                  scoutTeamNumber: match.scoutTeamNumber,
                  scoutName: match.scoutName,
                  flag: match.flag,
                });
                putEntries.mutate([
                  {
                    ...TeamMatchEntryNoShowInit,
                    eventKey: match.eventKey,
                    matchLevel: match.matchLevel,
                    matchNumber: match.matchNumber,
                    teamNumber: match.teamNumber!,
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
            }}>
            Submit
          </Button>
        : matchStage === "human" ?
          <>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
              }}
              sx={{
                mr: "auto",
              }}>
              Exit
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                let error = false;

                if (
                  !Number.isInteger(match.matchNumber) ||
                  match.matchNumber < 1
                ) {
                  error = true;
                  setMatchNumberError("Invalid match number.");
                } else if (
                  !events
                    .find((x) => x.eventKey === deviceSetup.currentEvent)
                    ?.matches.some(
                      (y) =>
                        y.matchNumber === match.matchNumber &&
                        y.matchLevel === match.matchLevel
                    )
                ) {
                  if (
                    matchNumberError !==
                    "Match not in schedule. Press Next again to ignore."
                  ) {
                    error = true;
                  }
                  setMatchNumberError(
                    "Match not in schedule. Press Next again to ignore."
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
                  match.scoutTeamNumber < 1 ||
                  match.scoutTeamNumber > MAX_TEAM_NUMBER
                ) {
                  error = true;
                  setScoutTeamNumberError("Invalid team number.");
                } else {
                  setScoutTeamNumberError("");
                }

                if (
                  match.teamNumber === null ||
                  isNaN(match.teamNumber) ||
                  match.teamNumber <= 0 ||
                  match.teamNumber > MAX_TEAM_NUMBER
                ) {
                  error = true;
                  setTeamNumberError("Invalid team number.");
                } else {
                  setTeamNumberError("");
                }

                if (!error) {
                  if (match.teamNumber === 0) {
                    setMatch({
                      ...HumanPlayerEntryNoShowInit,
                      eventKey: match.eventKey,
                      matchLevel: match.matchLevel,
                      matchNumber: match.matchNumber,
                      teamNumber: match.teamNumber!,
                      alliance: match.alliance,
                      robotNumber: 4,
                      deviceTeamNumber: match.deviceTeamNumber,
                      deviceId: match.deviceId,
                      scoutTeamNumber: match.scoutTeamNumber,
                      scoutName: match.scoutName,
                      flag: match.flag,
                    });
                    putEntries.mutate([
                      {
                        ...HumanPlayerEntryNoShowInit,
                        eventKey: match.eventKey,
                        matchLevel: match.matchLevel,
                        matchNumber: match.matchNumber,
                        teamNumber: match.teamNumber!,
                        alliance: match.alliance,
                        robotNumber: 4,
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
                }
              }}>
              Submit
            </Button>
          </>
        : undefined
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
                  startingPositionError={startingPositionError}
                />
              ),
              auto: (
                <Auto
                  match={match as TeamMatchEntry}
                  setMatch={setMatch}
                  deviceSetup={deviceSetup}
                  eventEmitter={eventEmitter}
                />
              ),
              teleop: (
                <Teleop
                  match={match as TeamMatchEntry}
                  setMatch={setMatch}
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
                  events={events}
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
