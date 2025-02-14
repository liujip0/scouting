import { TeamMatchEntry } from "@isa2025/api/src/utils/dbtypes.ts";
import { Divider, Stack, ToggleButtonGroup } from "@mui/material";
import {
  StyledRedToggleButton,
  StyledToggleButton,
} from "../../components/StyledToggleButton.tsx";

type TeleopProps = {
  match: TeamMatchEntry;
  setMatch: (value: TeamMatchEntry) => void;
};
export function Teleop({ match, setMatch }: TeleopProps) {
  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        height: 1,
      }}>
      <Stack
        sx={{
          flex: 1,
        }}></Stack>
      <Divider
        orientation="vertical"
        flexItem
      />
      <Stack
        sx={{
          flex: 1,
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
        <Stack>
          <ToggleButtonGroup>
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
                  });
                }
              }}
              sx={{
                borderBottomLeftRadius: 0,
                borderBottomWidth: 0,
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
                  });
                }
              }}
              sx={{
                borderBottomRightRadius: 0,
                borderBottomWidth: 0,
              }}>
              Attempted Deep Climb
            </StyledToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup>
            <StyledToggleButton
              value="Successful Shallow Climb?"
              selected={match.teleopSuccessfulShallow!}
              onChange={() => {
                if (!match.teleopSuccessfulShallow) {
                  setMatch({
                    ...match,
                    teleopSuccessfulShallow: true,
                    teleopAttemptedShallow: false,
                    teleopAttemptedDeep: false,
                    teleopSuccessfulDeep: false,
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
                    teleopAttemptedDeep: false,
                    teleopSuccessfulShallow: false,
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
              }}>
              Successful Deep Climb
            </StyledToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <StyledToggleButton
          value="Parked?"
          selected={match.teleopPark!}
          onChange={() =>
            setMatch({
              ...match,
              teleopPark: !match.teleopPark,
            })
          }>
          Parked
        </StyledToggleButton>
      </Stack>
    </Stack>
  );
}
