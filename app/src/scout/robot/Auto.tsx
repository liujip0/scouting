import { TeamMatchEntry } from "@isa2025/api/src/utils/dbtypes.ts";
import { Divider, Stack } from "@mui/material";
import {
  StyledRedToggleButton,
  StyledToggleButton,
} from "../../components/StyledToggleButton.tsx";

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
        }}></Stack>
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
