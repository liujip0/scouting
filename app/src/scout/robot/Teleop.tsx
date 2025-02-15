import { TeamMatchEntry } from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Divider, Stack, ToggleButtonGroup } from "@mui/material";
import {
  StyledRedToggleButton,
  StyledToggleButton,
} from "../../components/StyledToggleButton.tsx";
import { Counter } from "../Components.tsx";
import Branch from "../images/Branch.png";
import Net from "../images/Net.png";
import Processor from "../images/Processor.png";
import { DeviceSetupObj } from "../Scout.tsx";

type TeleopProps = {
  match: TeamMatchEntry;
  setMatch: (value: TeamMatchEntry) => void;
  deviceSetup: DeviceSetupObj;
};
export function Teleop({ match, setMatch, deviceSetup }: TeleopProps) {
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
          flex: 2,
          padding: 2,
        }}>
        <Stack
          sx={{
            height: 1,
            width: "60%",
            alignItems: "center",
            order: deviceSetup.fieldOrientation === "processor" ? 2 : 1,
          }}>
          <Box
            sx={{
              aspectRatio: "1670 / 2881",
              height: "65%",
              position: "relative",
              order: deviceSetup.fieldOrientation === "processor" ? 1 : 2,
            }}>
            <img
              src={Net}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
            <Counter
              value={match.teleopNet!}
              setValue={(value) => {
                setMatch({
                  ...match,
                  teleopNet: value,
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
          <Box
            sx={{
              height: "35%",
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
                value={match.teleopProcessor!}
                setValue={(value) => {
                  setMatch({
                    ...match,
                    teleopProcessor: value,
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
        </Stack>
        <Stack
          sx={{
            width: "40%",
            height: 1,
            alignItems: "center",
            order: deviceSetup.fieldOrientation === "processor" ? 1 : 2,
          }}>
          <Box
            sx={{
              height: "100%",
              order: deviceSetup.fieldOrientation === "processor" ? 1 : 2,
            }}>
            <Box
              sx={{
                aspectRatio: "1015 / 3069",
                maxHeight: "100%",
                maxWidth: "100%",
                position: "relative",
              }}>
              <img
                src={Branch}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
              <Counter
                value={match.teleopL4!}
                setValue={(value) => {
                  setMatch({
                    ...match,
                    teleopL4: value,
                  });
                }}
                label="L4 Coral"
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "10%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <Counter
                value={match.teleopL3!}
                setValue={(value) => {
                  setMatch({
                    ...match,
                    teleopL3: value,
                  });
                }}
                label="L3 Coral"
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "35%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <Counter
                value={match.teleopL2!}
                setValue={(value) => {
                  setMatch({
                    ...match,
                    teleopL2: value,
                  });
                }}
                label="L2 Coral"
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "55%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <Counter
                value={match.teleopL1!}
                setValue={(value) => {
                  setMatch({
                    ...match,
                    teleopL1: value,
                  });
                }}
                label="L1 Coral"
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "80%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
          </Box>
        </Stack>
      </Stack>
      <Divider
        orientation="vertical"
        flexItem
      />
      <Stack
        sx={{
          flex: 2,
          padding: 2,
          overflowY: "scroll",
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
          value="Played Defense?"
          selected={match.playedDefense!}
          onChange={() =>
            setMatch({
              ...match,
              playedDefense: !match.playedDefense,
            })
          }>
          Played Defense
        </StyledToggleButton>
        <Stack
          sx={{
            width: 1,
          }}>
          <ToggleButtonGroup
            sx={{
              width: 1,
            }}>
            <StyledToggleButton
              value="Attempted Shallow Climb?"
              selected={match.teleopAttemptedShallow!}
              onChange={() => {
                if (!match.teleopAttemptedShallow) {
                  setMatch({
                    ...match,
                    teleopAttemptedShallow: true,
                    teleopAttemptedDeep: false,
                    teleopSuccessfulShallow: false,
                    teleopSuccessfulDeep: false,
                  });
                } else {
                  setMatch({
                    ...match,
                    teleopAttemptedShallow: false,
                    teleopSuccessfulShallow: false,
                  });
                }
              }}
              sx={{
                borderBottomLeftRadius: 0,
                borderBottomWidth: 0,
                width: 0.5,
              }}>
              Attempted Shallow Climb
            </StyledToggleButton>
            <StyledToggleButton
              value="Attempted Deep Climb?"
              selected={match.teleopAttemptedDeep!}
              onChange={() => {
                if (!match.teleopAttemptedDeep) {
                  setMatch({
                    ...match,
                    teleopAttemptedDeep: true,
                    teleopAttemptedShallow: false,
                    teleopSuccessfulShallow: false,
                    teleopSuccessfulDeep: false,
                  });
                } else {
                  setMatch({
                    ...match,
                    teleopAttemptedDeep: false,
                    teleopSuccessfulDeep: false,
                  });
                }
              }}
              sx={{
                borderBottomRightRadius: 0,
                borderBottomWidth: 0,
                width: 0.5,
              }}>
              Attempted Deep Climb
            </StyledToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            sx={{
              width: 1,
            }}>
            <StyledToggleButton
              value="Successful Shallow Climb?"
              selected={match.teleopSuccessfulShallow!}
              onChange={() => {
                if (!match.teleopSuccessfulShallow) {
                  setMatch({
                    ...match,
                    teleopSuccessfulShallow: true,
                    teleopAttemptedShallow: true,
                    teleopAttemptedDeep: false,
                    teleopSuccessfulDeep: false,
                    teleopPark: false,
                  });
                } else {
                  setMatch({
                    ...match,
                    teleopSuccessfulShallow: false,
                  });
                }
              }}
              sx={{
                borderTopLeftRadius: 0,
                width: 0.5,
              }}>
              Successful Shallow Climb
            </StyledToggleButton>
            <StyledToggleButton
              value="Successful Deep Climb?"
              selected={match.teleopSuccessfulDeep!}
              onChange={() => {
                if (!match.teleopSuccessfulDeep) {
                  setMatch({
                    ...match,
                    teleopSuccessfulDeep: true,
                    teleopAttemptedShallow: false,
                    teleopAttemptedDeep: true,
                    teleopSuccessfulShallow: false,
                    teleopPark: false,
                  });
                } else {
                  setMatch({
                    ...match,
                    teleopSuccessfulDeep: false,
                  });
                }
              }}
              sx={{
                borderTopRightRadius: 0,
                width: 0.5,
              }}>
              Successful Deep Climb
            </StyledToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <StyledToggleButton
          value="Parked?"
          selected={match.teleopPark!}
          onChange={() => {
            if (!match.teleopPark) {
              setMatch({
                ...match,
                teleopPark: !match.teleopPark,
                teleopSuccessfulShallow: false,
                teleopSuccessfulDeep: false,
              });
            } else {
              setMatch({
                ...match,
                teleopPark: !match.teleopPark,
              });
            }
          }}>
          Parked
        </StyledToggleButton>
      </Stack>
    </Stack>
  );
}
