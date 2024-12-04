import {
  TeamMatchEntryColumn,
  TeamMatchEntryColumns,
} from "@isa2025/api/src/dbtypes.ts";
import { FilterAltOff } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Stack,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BorderedTable, Td, Th } from "../components/Table.tsx";
import { trpc } from "../utils/Trpc.tsx";

export default function ViewData() {
  const [events, setEvents] = useState("");
  const [teams, setTeams] = useState("");

  const data = trpc.data.useQuery({
    events: events ? (events.split(",") as [string, ...string[]]) : undefined,
    teams:
      teams ?
        (teams.split(",").map((team) => parseInt(team)) as [
          number,
          ...number[],
        ])
      : undefined,
  });

  return (
    <Stack
      sx={{
        width: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}>
      <Paper
        sx={{
          display: "flex",
          gap: 2,
        }}
        square>
        <Stack
          direction="row"
          gap={2}
          sx={{
            flex: 1,
            overflowX: "scroll",
            padding: 1,
          }}>
          <TextField
            onChange={(event) => {
              setEvents(event.currentTarget.value);
            }}
            label="Events (comma-separated)"
            size="small"
          />
          <TextField
            onChange={(event) => {
              setTeams(event.currentTarget.value);
            }}
            label="Teams (comma-separated)"
            size="small"
          />
        </Stack>
        <IconButton
          sx={{
            width: "max-content",
          }}>
          <FilterAltOff />
        </IconButton>
      </Paper>
      <TableContainer
        sx={{
          width: 1,
          flex: 1,
        }}>
        <BorderedTable>
          <TableHead>
            <TableRow>
              {TeamMatchEntryColumns.map((column) => (
                <Th
                  key={column}
                  thickRightBorder={
                    column === "entryVersion" ||
                    column === "autoAmp" ||
                    column === "teleopSpotlight"
                  }>
                  {column}
                </Th>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data?.map((teamMatchEntry, index) => {
              if (events) {
                let correctEvent = false;
                for (let event of events.split(",")) {
                  if (teamMatchEntry.eventKey === event) {
                    correctEvent = true;
                    break;
                  }
                }
                if (correctEvent === false) {
                  return;
                }
              }
              if (teams) {
                let correctTeam = false;
                for (let team of teams.split(",").map((x) => parseInt(x))) {
                  if (teamMatchEntry.teamNumber === team) {
                    correctTeam = true;
                    break;
                  }
                }
                if (correctTeam === false) {
                  return;
                }
              }
              return (
                <TableRow key={index}>
                  {TeamMatchEntryColumns.map((column) => (
                    <Td
                      key={column}
                      thickRightBorder={
                        column === "entryVersion" ||
                        column === "autoAmp" ||
                        column === "teleopSpotlight"
                      }>
                      <Typography>
                        {teamMatchEntry[column as TeamMatchEntryColumn]}
                      </Typography>
                    </Td>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </BorderedTable>
      </TableContainer>
    </Stack>
  );
}
