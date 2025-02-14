import { TeamMatchEntry } from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Divider, Stack } from "@mui/material";
import {
  StyledRedToggleButton,
  StyledToggleButton,
} from "../../components/StyledToggleButton.tsx";
import Net from "../images/Net.png";
import Processor from "../images/Processor.png";
import Reef from "../images/Reef.png";

type AutoProps = {
  match: TeamMatchEntry;
  setMatch: (value: TeamMatchEntry) => void;
};
export default function Auto({ match, setMatch }: AutoProps) {
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
                transform: "scaleX(-1)",
              }}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            width: "80%",
            height: 1,
            alignItems: "center",
          }}>
          <Box
            sx={{
              height: "45%",
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
            </Box>
          </Box>
          <Box
            sx={{
              height: "55%",
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
