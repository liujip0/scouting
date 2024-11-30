import {
  TeamMatchEntryColumn,
  TeamMatchEntryColumns,
} from "@isa2025/api/src/dbtypes.ts";
import { FilterAltOff, KeyboardReturn } from "@mui/icons-material";
import TabPanel from "@mui/lab/TabPanel";
import {
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { trpc } from "../utils/Trpc.tsx";

export default function ViewData() {
  const [events, setEvents] = useState("");
  const [eventsFocused, setEventsFocused] = useState(false);
  const [teams, setTeams] = useState("");
  const [teamsFocused, setTeamsFocused] = useState(false);

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
    <TabPanel
      value="viewdata"
      sx={{
        width: 1,
        height: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}>
      <Paper
        sx={{
          padding: 1,
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
          }}>
          <TextField
            onFocus={() => {
              setEventsFocused(true);
            }}
            onBlur={(event) => {
              setEvents(event.currentTarget.value);
              setEventsFocused(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                (event.target as HTMLInputElement).blur();
              }
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <KeyboardReturn
                      sx={(theme) => ({
                        color:
                          theme.palette.primary.main +
                          (eventsFocused ? "88" : "00"),
                      })}
                    />
                  </InputAdornment>
                ),
              },
            }}
            label="Events (comma-separated)"
            size="small"
          />
          <TextField
            onFocus={() => {
              setTeamsFocused(true);
            }}
            onBlur={(event) => {
              setTeams(event.currentTarget.value);
              setTeamsFocused(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                (event.target as HTMLInputElement).blur();
              }
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <KeyboardReturn
                      sx={(theme) => ({
                        color:
                          theme.palette.primary.main +
                          (teamsFocused ? "88" : "00"),
                      })}
                    />
                  </InputAdornment>
                ),
              },
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
          height: 1,
        }}>
        <Table
          sx={{
            borderColor: "primary.main",
            borderWidth: 3,
          }}>
          <TableHead>
            <TableRow>
              {TeamMatchEntryColumns.map((column) => (
                <TableCell
                  key={column}
                  sx={{
                    borderColor: "primary.main",
                    //TODO: change when new columns
                    borderRightWidth:
                      (
                        column === "entryVersion" ||
                        column === "autoAmp" ||
                        column === "teleopSpotlight"
                      ) ?
                        2.5
                      : undefined,
                  }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data?.map((teamMatchEntry) => (
              <TableRow
                key={[
                  teamMatchEntry.eventKey,
                  teamMatchEntry.matchKey,
                  teamMatchEntry.alliance,
                  teamMatchEntry.robotNumber,
                  teamMatchEntry.entryVersion,
                ].join("_")}>
                {TeamMatchEntryColumns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      borderColor: "primary.main",
                      borderRightWidth:
                        (
                          column === "entryVersion" ||
                          column === "autoAmp" ||
                          column === "teleopSpotlight"
                        ) ?
                          2.5
                        : undefined,
                      borderTopWidth: 2,
                    }}>
                    {teamMatchEntry[column as TeamMatchEntryColumn]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TabPanel>
  );
}
