import {
  DBEvent,
  Match,
  MatchColumns,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Delete, Done, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { Fragment } from "react/jsx-runtime";
import { Th } from "../../components/Table.tsx";
import { Overwrite } from "../../utils/Utils.ts";

type CreateEventProps = {
  createEvent: boolean;
  setCreateEvent: (value: boolean) => void;
};
export default function CreateEvent({
  createEvent,
  setCreateEvent,
}: CreateEventProps) {
  const [newEvent, setNewEvent] = useState<DBEvent & { matches: Match[] }>({
    eventKey: "",
    eventName: "",
    matches: [],
  });
  const closeCreateEvent = () => {
    setCreateEvent(false);
  };
  const [newMatch, setNewMatch] = useState<
    Overwrite<
      Match,
      {
        red1: string;
        red2: string;
        red3: string;
        blue1: string;
        blue2: string;
        blue3: string;
      }
    >
  >({
    eventKey: "",
    matchKey: "",
    red1: "",
    red2: "",
    red3: "",
    blue1: "",
    blue2: "",
    blue3: "",
  });
  const setNewEventMatch = (match: Match) => {
    const newMatches = newEvent.matches.filter(
      (x) => x.matchKey !== match.matchKey
    );
    newMatches.push(match);
    setNewEvent({
      ...newEvent,
      matches: newMatches,
    });
  };

  return (
    <Dialog
      open={createEvent}
      onClose={closeCreateEvent}
      PaperProps={{
        sx: {
          width: "max-content",
          maxWidth: "90vw",
        },
      }}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            mt: 1,
          }}
          gap={2}>
          <Stack
            direction="row"
            gap={2}>
            <TextField
              value={newEvent.eventKey}
              onChange={(event) => {
                setNewEvent({
                  ...newEvent,
                  eventKey: event.currentTarget.value,
                });
                setNewMatch({
                  ...newMatch,
                  eventKey: event.currentTarget.value,
                });
              }}
              label="Event Code"
            />
            <TextField
              value={newEvent.eventName}
              onChange={(event) => {
                setNewEvent({
                  ...newEvent,
                  eventName: event.currentTarget.value,
                });
              }}
              label="Event Name"
            />
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {MatchColumns.map((column) =>
                    column !== "eventKey" ?
                      <Th key={column}>{column}</Th>
                    : <Fragment key={column}></Fragment>
                  )}
                  <Th>Actions</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {newEvent.matches.map((match) => (
                  <TableRow key={match.matchKey}>
                    {MatchColumns.map((column) =>
                      column !== "eventKey" ?
                        <TableCell
                          key={column}
                          sx={{
                            pt: 0.5,
                            pb: 0.5,
                          }}>
                          {match[column]}
                        </TableCell>
                      : <Fragment key={column}></Fragment>
                    )}
                    <TableCell
                      sx={{
                        padding: 0.5,
                      }}>
                      <Stack direction="row">
                        <IconButton color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton color="primary">
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  {MatchColumns.map((column) =>
                    column !== "eventKey" ?
                      <TableCell
                        key={column}
                        sx={{
                          padding: 0.5,
                        }}>
                        <TextField
                          value={newMatch[column]}
                          onChange={(event) => {
                            setNewMatch({
                              ...newMatch,
                              [column]: event.currentTarget.value,
                            });
                          }}
                          slotProps={{
                            input: {
                              sx: {
                                padding: 0,
                              },
                            },
                            htmlInput: {
                              sx: {
                                padding: 1,
                              },
                            },
                          }}
                        />
                      </TableCell>
                    : <Fragment key={column}></Fragment>
                  )}
                  <TableCell
                    sx={{
                      padding: 0.5,
                    }}>
                    <Stack direction="row">
                      <IconButton
                        onClick={() => {
                          setNewEventMatch({
                            ...newMatch,
                            red1: parseInt(newMatch.red1),
                            red2: parseInt(newMatch.red2),
                            red3: parseInt(newMatch.red3),
                            blue1: parseInt(newMatch.blue1),
                            blue2: parseInt(newMatch.blue2),
                            blue3: parseInt(newMatch.blue3),
                          });
                          setNewMatch({
                            eventKey: newEvent.eventKey,
                            matchKey: "",
                            red1: "",
                            red2: "",
                            red3: "",
                            blue1: "",
                            blue2: "",
                            blue3: "",
                          });
                        }}
                        color="primary">
                        <Done />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCreateEvent}>Cancel</Button>
        <Button
          onClick={() => {
            closeCreateEvent();
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
