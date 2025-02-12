import {
  HumanPlayerEntry,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Add, Remove } from "@mui/icons-material";
import { Divider, IconButton, Stack, TextField } from "@mui/material";

type HumanProps = {
  match: TeamMatchEntry | HumanPlayerEntry;
  setMatch: (value: TeamMatchEntry | HumanPlayerEntry) => void;
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
          value={match.scoutTeamNumber}
          onChange={(event) => {
            setMatch({
              ...match,
              scoutTeamNumber: parseInt(event.currentTarget.value),
            });
          }}
          type="number"
          variant="outlined"
          label="Scout Team Number"
          error={scoutTeamNumberError !== ""}
          helperText={scoutTeamNumberError}
        />
        <TextField
          value={match.matchKey}
          onChange={(event) => {
            setMatch({
              ...match,
              matchKey: event.currentTarget.value,
              teamNumber: 0,
            });
          }}
          label="Match Number"
          slotProps={{
            input: {
              startAdornment: (
                <IconButton
                  onClick={() => {
                    let newMatchKey = "";

                    if (/^qm\d+$/.test(match.matchKey)) {
                      newMatchKey =
                        "qm" + (parseInt(match.matchKey.substring(2)) - 1);
                    }

                    if (newMatchKey) {
                      setMatch({
                        ...match,
                        matchKey: newMatchKey,
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
                    let newMatchKey = "";

                    if (/^qm\d+$/.test(match.matchKey)) {
                      newMatchKey =
                        "qm" + (parseInt(match.matchKey.substring(2)) + 1);
                    }

                    if (newMatchKey) {
                      setMatch({
                        ...match,
                        matchKey: newMatchKey,
                        teamNumber: 0,
                      });
                    }
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
        gap={2}></Stack>
    </Stack>
  );
}
