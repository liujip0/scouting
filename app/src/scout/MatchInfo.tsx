import {
  DBEvent,
  Match,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Button, Divider, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ScoutLayout, ScoutPage } from "./Scout.tsx";

type MatchInfoProps = {
  setPage: (newValue: ScoutPage) => void;
  match: TeamMatchEntry;
  setMatch: (value: TeamMatchEntry) => void;
  events: (DBEvent & { matches: Match[] })[];
  currentEvent: string;
};
export default function MatchInfo({
  setPage,
  match,
  setMatch,
  events,
  currentEvent,
}: MatchInfoProps) {
  const navigate = useNavigate();

  return (
    <ScoutLayout
      title="Scout & Match Info"
      nowScouting={{
        teamNumber: 3494,
        alliance: "red",
        robotPosition: 1,
      }}
      navButtons={
        <>
          <Button
            onClick={() => {
              setPage("devicesetup");
            }}
            variant="outlined">
            Device Setup
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="outlined">
            Return to Home
          </Button>
          <Button
            onClick={() => {
              setPage("auto");
            }}
            variant="contained">
            Continue
          </Button>
        </>
      }>
      <Box
        sx={{
          width: 1,
          height: 1,
          display: "flex",
          pt: 4,
          pb: 4,
        }}>
        <Stack
          sx={{
            flex: 1,
            pl: 4,
            pr: 4,
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
          <TextField
            value={currentEvent}
            label="Event Code"
            disabled
          />
        </Stack>
      </Box>
    </ScoutLayout>
  );
}
