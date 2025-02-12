import { DBEvent, Match } from "@isa2025/api/src/utils/dbtypes.ts";
import { omit } from "@isa2025/api/src/utils/utils.ts";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { putDBEvent, putDBMatches } from "../../utils/idb.ts";
import { trpc } from "../../utils/trpc.ts";

type DownloadEventProps = {
  downloadEvent: boolean;
  setDownloadEvent: (value: boolean) => void;
  events: (DBEvent & { matches: Match[] })[];
  setEvents: (value: (DBEvent & { matches: Match[] })[]) => void;
};
export default function DownloadEvent({
  downloadEvent,
  setDownloadEvent,
  events,
  setEvents,
}: DownloadEventProps) {
  const [eventKey, setEventKey] = useState("");
  const [eventKeyError, setEventKeyError] = useState("");

  const [FrcStatus, setFrcStatus] = useState("");
  const [isaStatus, setIsaStatus] = useState("");

  const getEvent = trpc.events.getEvent.useMutation({
    onSuccess(data) {
      setIsaStatus("Success");

      setEvents([...events.filter((x) => x.eventKey !== data.eventKey), data]);

      putDBEvent(omit("matches", data) as DBEvent);
      putDBMatches(data.matches);
    },
    onError(err) {
      setIsaStatus(err.message);
    },
  });
  const getFrcEvent = trpc.events.getFrcEvent.useMutation({
    onSuccess(data) {
      setFrcStatus("Success");

      setEvents([...events.filter((x) => x.eventKey !== data.eventKey), data]);

      putDBEvent(omit("matches", data) as DBEvent);
      putDBMatches(data.matches);
    },
    onError(err) {
      setFrcStatus(err.message);
    },
  });

  return (
    <Dialog
      open={downloadEvent}
      onClose={() => {
        setDownloadEvent(false);
      }}>
      <DialogTitle>Download Event</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            pt: 2,
          }}
          gap={2}>
          <TextField
            value={eventKey}
            onChange={(event) => {
              setEventKey(event.currentTarget.value);
            }}
            label="eventKey"
            error={eventKeyError !== ""}
            helperText={eventKeyError}
          />
          <Stack
            direction="row"
            gap={2}
            sx={{
              width: 1,
            }}>
            <Button
              variant="outlined"
              onClick={() => {
                let error = false;
                if (eventKey === "") {
                  setEventKeyError("Cannot be empty");
                  error = true;
                } else {
                  setEventKeyError("");
                }

                if (!error) {
                  setFrcStatus("Loading...");
                  getFrcEvent.mutate(eventKey);
                }
              }}>
              FRC Events
            </Button>
            <Button
              variant="outlined"
              onClick={async () => {
                let error = false;
                if (eventKey === "") {
                  setEventKeyError("Cannot be empty");
                  error = true;
                } else {
                  setEventKeyError("");
                }

                if (!error) {
                  setIsaStatus("Loading...");
                  getEvent.mutate(eventKey);
                }
              }}>
              ISA Server
            </Button>
          </Stack>
          <Box>
            {FrcStatus ? "FRC Events: " + FrcStatus : ""}
            <br />
            {isaStatus ? "ISA Server: " + isaStatus : ""}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setDownloadEvent(false);
          }}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
