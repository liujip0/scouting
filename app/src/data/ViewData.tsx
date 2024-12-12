import {
  TeamMatchEntryColumn,
  TeamMatchEntryColumns,
} from "@isa2025/api/src/dbtypes.ts";
import { FilterAltOff, Refresh } from "@mui/icons-material";
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

type ViewDataProps = {
  hidden: boolean;
  logoutFunction: () => void;
};
export default function ViewData({ hidden, logoutFunction }: ViewDataProps) {
  const [events, setEvents] = useState("");
  const [teams, setTeams] = useState("");
  const [match, setMatch] = useState("");

  const data = trpc.data.data.useQuery(
    {},
    {
      retry: (_failureCount, error) => {
        if (error.data?.httpStatus === 401) {
          logoutFunction();
          return false;
        } else {
          return true;
        }
      },
    }
  );

  return (
    <Stack
      gap={2}
      sx={{
        width: 1,
        height: 1,
        padding: 2,
        display: hidden ? "none" : "flex",
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
            value={events}
            onChange={(event) => {
              setEvents(event.currentTarget.value);
            }}
            label="Events"
            helperText="comma-separated"
            size="small"
            sx={{
              width: 175,
            }}
          />
          <TextField
            value={match}
            onChange={(event) => {
              setMatch(event.currentTarget.value);
            }}
            label="Match"
            helperText="key or #"
            size="small"
            sx={{
              width: 100,
            }}
          />
          <TextField
            value={teams}
            onChange={(event) => {
              setTeams(event.currentTarget.value);
            }}
            label="Teams"
            helperText="comma-separated"
            size="small"
            sx={{
              width: 175,
            }}
          />
        </Stack>
        <IconButton
          onClick={() => {
            data.refetch();
          }}
          sx={{
            width: "max-content",
          }}>
          <Refresh />
        </IconButton>
        <IconButton
          onClick={() => {
            setEvents("");
            setMatch("");
            setTeams("");
          }}
          sx={{
            mr: 1,
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
                for (let event of events.replace(/ /g, "").split(",")) {
                  if (teamMatchEntry.eventKey.includes(event)) {
                    correctEvent = true;
                    break;
                  }
                }
                if (!correctEvent) {
                  return;
                }
              }
              if (match) {
                const trimmedMatch = match.replace(/ /g, "");
                if (/^\d+$/.test(trimmedMatch)) {
                  if (teamMatchEntry.matchKey !== "qm" + trimmedMatch) {
                    return;
                  }
                } else if (
                  trimmedMatch === "qm" ||
                  /^(?:qf|sf|f)\d*(?:m\d*)?$/.test(trimmedMatch)
                ) {
                  if (!teamMatchEntry.matchKey.startsWith(trimmedMatch)) {
                    return;
                  }
                } else {
                  if (teamMatchEntry.matchKey !== trimmedMatch) {
                    return;
                  }
                }
              }
              if (teams) {
                let correctTeam = false;
                for (let team of teams
                  .replace(/ /g, "")
                  .split(",")
                  .map((x) => parseInt(x))) {
                  if (teamMatchEntry.teamNumber === team) {
                    correctTeam = true;
                    break;
                  }
                }
                if (!correctTeam) {
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
