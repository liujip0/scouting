import {
  TeamMatchEntry,
  TeamMatchEntryColumn,
} from "@isa2025/api/src/utils/dbtypes.ts";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Divider,
  Popper,
  Stack,
} from "@mui/material";
import { useState } from "react";
import {
  StyledRedToggleButton,
  StyledToggleButton,
} from "../../components/StyledToggleButton.tsx";
import { CircleButton, Counter } from "../Components.tsx";
import Net from "../images/Net.png";
import Processor from "../images/Processor.png";
import Reef from "../images/Reef.png";
import { DeviceSetupObj } from "../Scout.tsx";

type AutoProps = {
  match: TeamMatchEntry;
  setMatch: (value: TeamMatchEntry) => void;
  deviceSetup: DeviceSetupObj;
};
export default function Auto({ match, setMatch, deviceSetup }: AutoProps) {
  const [popperAnchor, setPopperAnchor] = useState<null | HTMLElement>(null);
  const [popperReef, setPopperReef] = useState<
    "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | ""
  >("");

  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        height: 1,
      }}>
      <Stack
        direction="row"
        sx={{
          flex: 3,
          padding: 2,
        }}>
        <Stack
          sx={{
            height: 1,
            width: "max(20%, max-content)",
            alignItems: "center",
            order: deviceSetup.fieldOrientation === "processor" ? 2 : 1,
          }}>
          <Box
            sx={{
              aspectRatio: "634 / 2547",
              height: "100%",
              position: "relative",
            }}>
            <img
              src={Net}
              style={{
                height: "100%",
                width: "100%",
                transform:
                  "scaleX(" +
                  (deviceSetup.fieldOrientation === "processor" ? 1 : -1) +
                  ")",
              }}
            />
            <Counter
              value={match.autoNet!}
              setValue={(value) => {
                setMatch({
                  ...match,
                  autoNet: value,
                });
              }}
              label="Algae in Net"
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            width: "80%",
            height: 1,
            alignItems: "center",
            order: deviceSetup.fieldOrientation === "processor" ? 1 : 2,
          }}>
          <Box
            sx={{
              height: "45%",
              order: deviceSetup.fieldOrientation === "processor" ? 2 : 1,
            }}>
            <Box
              sx={{
                aspectRatio: "2547 / 2311",
                maxHeight: "100%",
                maxWidth: "100%",
                position: "relative",
              }}>
              <img
                src={Processor}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
              <Counter
                value={match.autoProcessor!}
                setValue={(value) => {
                  setMatch({
                    ...match,
                    autoProcessor: value,
                  });
                }}
                label="Algae in Processor"
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "35%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              height: "55%",
              order: deviceSetup.fieldOrientation === "processor" ? 1 : 2,
            }}>
            <Box
              sx={{
                aspectRatio: "2547 / 2869",
                maxHeight: "100%",
                maxWidth: "100%",
                position: "relative",
              }}>
              <img
                src={Reef}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
              <CircleButton
                label="A"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "A" ? null : event.currentTarget
                  );
                  setPopperReef("A");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      left: "8%",
                      top: "37%",
                      transform: "translate(-50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      right: "8%",
                      top: "60%",
                      transform: "translate(50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="B"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "B" ? null : event.currentTarget
                  );
                  setPopperReef("B");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      left: "8%",
                      top: "60%",
                      transform: "translate(-50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      right: "8%",
                      top: "37%",
                      transform: "translate(50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="C"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "C" ? null : event.currentTarget
                  );
                  setPopperReef("C");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      left: "20%",
                      top: "80%",
                      transform: "translate(-50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      right: "20%",
                      top: "17%",
                      transform: "translate(50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="D"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "D" ? null : event.currentTarget
                  );
                  setPopperReef("D");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      left: "38%",
                      top: "90%",
                      transform: "translate(-50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      right: "38%",
                      top: "7%",
                      transform: "translate(50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="E"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "E" ? null : event.currentTarget
                  );
                  setPopperReef("E");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      right: "38%",
                      top: "90%",
                      transform: "translate(50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      left: "38%",
                      top: "7%",
                      transform: "translate(-50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="F"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "F" ? null : event.currentTarget
                  );
                  setPopperReef("F");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      right: "20%",
                      top: "80%",
                      transform: "translate(50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      left: "20%",
                      top: "17%",
                      transform: "translate(-50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="G"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "G" ? null : event.currentTarget
                  );
                  setPopperReef("G");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      right: "8%",
                      top: "60%",
                      transform: "translate(50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      left: "8%",
                      top: "37%",
                      transform: "translate(-50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="H"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "H" ? null : event.currentTarget
                  );
                  setPopperReef("H");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      right: "8%",
                      top: "37%",
                      transform: "translate(50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      left: "8%",
                      top: "60%",
                      transform: "translate(-50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="I"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "I" ? null : event.currentTarget
                  );
                  setPopperReef("I");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      right: "20%",
                      top: "17%",
                      transform: "translate(50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      left: "20%",
                      top: "80%",
                      transform: "translate(-50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="J"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "J" ? null : event.currentTarget
                  );
                  setPopperReef("J");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      right: "38%",
                      top: "7%",
                      transform: "translate(50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      left: "38%",
                      top: "90%",
                      transform: "translate(-50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="K"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "K" ? null : event.currentTarget
                  );
                  setPopperReef("K");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      left: "38%",
                      top: "7%",
                      transform: "translate(-50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      right: "38%",
                      top: "90%",
                      transform: "translate(50%, -50%)",
                    }
                }
              />
              <CircleButton
                label="L"
                onClick={(event) => {
                  event.stopPropagation();
                  setPopperAnchor(
                    popperReef === "L" ? null : event.currentTarget
                  );
                  setPopperReef("L");
                }}
                sx={
                  deviceSetup.fieldOrientation === "processor" ?
                    {
                      position: "absolute",
                      left: "20%",
                      top: "17%",
                      transform: "translate(-50%, -50%)",
                    }
                  : {
                      position: "absolute",
                      right: "20%",
                      top: "80%",
                      transform: "translate(50%, -50%)",
                    }
                }
              />
              <Button
                onClick={() => {
                  //TODO
                }}
                sx={{
                  position: "absolute",
                  display: "none",
                }}>
                Undo
              </Button>
              <ClickAwayListener
                onClickAway={() => {
                  setPopperAnchor(null);
                  setPopperReef("");
                }}>
                <Popper
                  open={popperAnchor !== null}
                  anchorEl={popperAnchor}
                  placement="left"
                  modifiers={[
                    {
                      name: "flip",
                      enabled: true,
                      options: {
                        altBoundary: true,
                        rootBoundary: "viewport",
                        padding: 8,
                      },
                    },
                    {
                      name: "preventOverflow",
                      enabled: true,
                      options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: true,
                        rootBoundary: "document",
                        padding: 8,
                      },
                    },
                  ]}>
                  <ButtonGroup
                    orientation="vertical"
                    sx={{
                      backgroundColor: "background.paper",
                    }}>
                    <Button
                      onClick={() => {
                        if (popperReef) {
                          setMatch({
                            ...match,
                            ["autoCoral" + popperReef + "L4"]:
                              (match[
                                ("autoCoral" +
                                  popperReef +
                                  "L4") as TeamMatchEntryColumn
                              ] as number) + 1,
                          });
                          setPopperAnchor(null);
                          setPopperReef("");
                        }
                      }}>
                      L4
                    </Button>
                    <Button
                      onClick={() => {
                        if (popperReef) {
                          setMatch({
                            ...match,
                            ["autoCoral" + popperReef + "L3"]:
                              (match[
                                ("autoCoral" +
                                  popperReef +
                                  "L3") as TeamMatchEntryColumn
                              ] as number) + 1,
                          });
                          setPopperAnchor(null);
                          setPopperReef("");
                        }
                      }}>
                      L3
                    </Button>
                    <Button
                      onClick={() => {
                        if (popperReef) {
                          setMatch({
                            ...match,
                            ["autoCoral" + popperReef + "L2"]:
                              (match[
                                ("autoCoral" +
                                  popperReef +
                                  "L2") as TeamMatchEntryColumn
                              ] as number) + 1,
                          });
                          setPopperAnchor(null);
                          setPopperReef("");
                        }
                      }}>
                      L2
                    </Button>
                    <Button
                      onClick={() => {
                        if (popperReef) {
                          setMatch({
                            ...match,
                            ["autoCoral" + popperReef + "L1"]:
                              (match[
                                ("autoCoral" +
                                  popperReef +
                                  "L1") as TeamMatchEntryColumn
                              ] as number) + 1,
                          });
                          setPopperAnchor(null);
                          setPopperReef("");
                        }
                      }}>
                      L1
                    </Button>
                  </ButtonGroup>
                </Popper>
              </ClickAwayListener>
            </Box>
          </Box>
        </Stack>
      </Stack>
      <Divider orientation="vertical" />
      <Stack
        sx={{
          flex: 2,
          padding: 2,
        }}
        gap={2}>
        <StyledRedToggleButton
          value="Robot Died?"
          selected={match.died!}
          onChange={() =>
            setMatch({
              ...match,
              died: !match.died,
            })
          }>
          Robot Died
        </StyledRedToggleButton>
        <StyledToggleButton
          value="Removed Algae from Reef?"
          selected={match.removedAlgaeFromReef!}
          onChange={() =>
            setMatch({
              ...match,
              removedAlgaeFromReef: !match.removedAlgaeFromReef,
            })
          }>
          Removed Algae from Reef
        </StyledToggleButton>
        <StyledToggleButton
          value="Crossed Robot Starting Line?"
          selected={match.autoCrossedRSL!}
          onChange={() =>
            setMatch({
              ...match,
              autoCrossedRSL: !match.autoCrossedRSL,
            })
          }>
          Crossed Robot Starting Line
        </StyledToggleButton>
      </Stack>
    </Stack>
  );
}
