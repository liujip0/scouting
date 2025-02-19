import {
  TeamMatchEntry,
  TeamMatchEntryColumn,
} from "@isa2025/api/src/utils/dbtypes.ts";
import {
  Box,
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
import { DeviceSetupObj } from "../../setup/DeviceSetup.tsx";
import { CircleButton, Counter } from "../Components.tsx";
import Net from "../images/Net.png";
import Processor from "../images/Processor.png";
import Reef from "../images/Reef.png";

type AutoProps = {
  match: TeamMatchEntry;
  setMatch: (value: TeamMatchEntry) => void;
  deviceSetup: DeviceSetupObj;
};
export default function Auto({ match, setMatch, deviceSetup }: AutoProps) {
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
          width: "50%",
          padding: 2,
          alignItems: "center",
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
            color={popperReef === "A" ? "primary" : "secondary"}
            label="A"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "A" ? "" : "A");
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
            color={popperReef === "B" ? "primary" : "secondary"}
            label="B"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "B" ? "" : "B");
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
            color={popperReef === "C" ? "primary" : "secondary"}
            label="C"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "C" ? "" : "C");
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
            color={popperReef === "D" ? "primary" : "secondary"}
            label="D"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "D" ? "" : "D");
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
            color={popperReef === "E" ? "primary" : "secondary"}
            label="E"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "E" ? "" : "E");
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
            color={popperReef === "F" ? "primary" : "secondary"}
            label="F"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "F" ? "" : "F");
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
            color={popperReef === "G" ? "primary" : "secondary"}
            label="G"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "G" ? "" : "G");
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
            color={popperReef === "H" ? "primary" : "secondary"}
            label="H"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "H" ? "" : "H");
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
            color={popperReef === "I" ? "primary" : "secondary"}
            label="I"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "I" ? "" : "I");
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
            color={popperReef === "J" ? "primary" : "secondary"}
            label="J"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "J" ? "" : "J");
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
            color={popperReef === "K" ? "primary" : "secondary"}
            label="K"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "K" ? "" : "K");
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
            color={popperReef === "L" ? "primary" : "secondary"}
            label="L"
            onClick={(event) => {
              event.stopPropagation();
              setPopperReef(popperReef === "L" ? "" : "L");
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
          <ClickAwayListener
            onClickAway={() => {
              setPopperReef("");
            }}>
            <Popper
              open={popperReef !== ""}
              slotProps={{
                root: {
                  style: {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                },
              }}
              disablePortal
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
                <StyledToggleButton
                  value="L4"
                  selected={
                    match[
                      ("autoCoral" + popperReef + "L4") as TeamMatchEntryColumn
                    ] as boolean
                  }
                  onClick={() => {
                    if (popperReef) {
                      setMatch({
                        ...match,
                        ["autoCoral" + popperReef + "L4"]: !(match[
                          ("autoCoral" +
                            popperReef +
                            "L4") as TeamMatchEntryColumn
                        ] as boolean),
                      });
                      setPopperReef("");
                    }
                  }}>
                  L4
                </StyledToggleButton>
                <StyledToggleButton
                  value="L3"
                  selected={
                    match[
                      ("autoCoral" + popperReef + "L3") as TeamMatchEntryColumn
                    ] as boolean
                  }
                  onClick={() => {
                    if (popperReef) {
                      setMatch({
                        ...match,
                        ["autoCoral" + popperReef + "L3"]: !(match[
                          ("autoCoral" +
                            popperReef +
                            "L3") as TeamMatchEntryColumn
                        ] as boolean),
                      });
                      setPopperReef("");
                    }
                  }}>
                  L3
                </StyledToggleButton>
                <StyledToggleButton
                  value="L2"
                  selected={
                    match[
                      ("autoCoral" + popperReef + "L2") as TeamMatchEntryColumn
                    ] as boolean
                  }
                  onClick={() => {
                    if (popperReef) {
                      setMatch({
                        ...match,
                        ["autoCoral" + popperReef + "L2"]: !(match[
                          ("autoCoral" +
                            popperReef +
                            "L2") as TeamMatchEntryColumn
                        ] as boolean),
                      });
                      setPopperReef("");
                    }
                  }}>
                  L2
                </StyledToggleButton>
                <StyledToggleButton
                  value="L1"
                  selected={
                    match[
                      ("autoCoral" + popperReef + "L1") as TeamMatchEntryColumn
                    ] as boolean
                  }
                  onClick={() => {
                    if (popperReef) {
                      setMatch({
                        ...match,
                        ["autoCoral" + popperReef + "L1"]: !(match[
                          ("autoCoral" +
                            popperReef +
                            "L1") as TeamMatchEntryColumn
                        ] as boolean),
                      });
                      setPopperReef("");
                    }
                  }}>
                  L1
                </StyledToggleButton>
              </ButtonGroup>
            </Popper>
          </ClickAwayListener>
        </Box>
      </Stack>
      <Divider orientation="vertical" />
      <Stack
        sx={{
          width: "50%",
          height: "100%",
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
        <Stack
          direction="row"
          sx={{
            flex: 1,
          }}>
          <Stack
            sx={{
              width: "65%",
              alignItems: "center",
            }}>
            <Box
              sx={{
                aspectRatio: "2547 / 2311",
                maxWidth: "100%",
                maxHeight: "100%",
                position: "relative",
              }}
              onClick={() => {
                setMatch({
                  ...match,
                  autoProcessor: match.autoProcessor! + 1,
                });
              }}>
              <img
                src={Processor}
                style={{
                  width: "100%",
                  height: "100%",
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
          </Stack>
          <Stack
            sx={{
              width: "35%",
              alignItems: "center",
            }}>
            <Box
              sx={{
                aspectRatio: "1670 / 2881",
                maxWidth: "100%",
                maxHeight: "100%",
                position: "relative",
              }}
              onClick={() => {
                setMatch({
                  ...match,
                  autoNet: match.autoNet! + 1,
                });
              }}>
              <img
                src={Net}
                style={{
                  width: "100%",
                  height: "100%",
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
                  top: "45%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
