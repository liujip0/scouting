import {
  HumanPlayerEntry,
  MatchLevel,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Add, Remove } from "@mui/icons-material";
import { Divider, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { BigCounter } from "./Components.tsx";

type HumanProps = {
  match: HumanPlayerEntry;
  setMatch: (value: HumanPlayerEntry) => void;
  scoutNameError: string;
  scoutTeamNumberError: string;
  teamNumberError: string;
};
export default function Human({
  match,
  setMatch,
  scoutNameError,
  scoutTeamNumberError,
  teamNumberError,
}: HumanProps) {
  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        height: 1,
        pt: 2,
      }}>
      <Stack
        sx={{
          flex: 1,
          pl: 2,
          pr: 2,
        }}
        gap={2}>
        <TextField
          value={match.scoutName}
          onChange={(event) => {
            setMatch({
              ...match,
              scoutName: event.currentTarget.value,
            });
          }}
          type="text"
          variant="outlined"
          label="Scout Name & Last Initial"
          error={scoutNameError !== ""}
          helperText={scoutNameError}
        />
        <TextField
          value={isNaN(match.scoutTeamNumber) ? "" : match.scoutTeamNumber}
          onChange={(event) => {
            setMatch({
              ...match,
              scoutTeamNumber: parseInt(event.currentTarget.value),
            });
          }}
          variant="outlined"
          label="Scout Team Number"
          error={scoutTeamNumberError !== ""}
          helperText={scoutTeamNumberError}
        />
        <TextField
          select
          value={match.matchLevel}
          label="Match Level"
          onChange={(event) => {
            setMatch({
              ...match,
              matchLevel: event.target.value as (typeof MatchLevel)[number],
            });
          }}>
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Practice">Practice</MenuItem>
          <MenuItem value="Qualification">Qualification</MenuItem>
          <MenuItem value="Playoff">Playoff</MenuItem>
        </TextField>
        <TextField
          value={isNaN(match.matchNumber) ? "" : match.matchNumber}
          onChange={(event) => {
            setMatch({
              ...match,
              matchNumber: parseInt(event.currentTarget.value),
              teamNumber: 0,
            });
          }}
          label="Match Number"
          slotProps={{
            input: {
              startAdornment: (
                <IconButton
                  onClick={() => {
                    if (match.matchNumber > 1) {
                      setMatch({
                        ...match,
                        matchNumber: match.matchNumber - 1,
                        teamNumber: 0,
                      });
                    }
                  }}>
                  <Remove />
                </IconButton>
              ),
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setMatch({
                      ...match,
                      matchNumber: match.matchNumber + 1,
                      teamNumber: 0,
                    });
                  }}>
                  <Add />
                </IconButton>
              ),
            },
          }}
        />
        <TextField
          label="Robot Team Number"
          value={isNaN(match.teamNumber) ? "" : match.teamNumber}
          onChange={(event) => {
            setMatch({
              ...match,
              teamNumber: parseInt(event.currentTarget.value),
            });
          }}
          error={teamNumberError !== ""}
          helperText={teamNumberError}
        />
      </Stack>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Stack
        sx={{
          flex: 1,
          pl: 4,
          pr: 4,
        }}
        gap={2}>
        <BigCounter
          value={match.humanAttemptedNet}
          increment={() => {
            setMatch({
              ...match,
              humanAttemptedNet: match.humanAttemptedNet + 1,
            });
          }}
          decrement={() => {
            setMatch({
              ...match,
              humanAttemptedNet: match.humanAttemptedNet - 1,
            });
          }}
          label="Attempted Algae in Net"
        />
        <BigCounter
          value={match.humanSuccessfulNet}
          increment={() => {
            setMatch({
              ...match,
              humanSuccessfulNet: match.humanSuccessfulNet + 1,
              humanAttemptedNet: match.humanAttemptedNet + 1,
            });
          }}
          decrement={() => {
            setMatch({
              ...match,
              humanSuccessfulNet: match.humanSuccessfulNet - 1,
            });
          }}
          label="Successful Algae in Net"
          max={18}
        />
      </Stack>
    </Stack>
  );
}
