import { DBEvent, Match } from "@isa2025/api/src/utils/dbtypes.ts";
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
import { putDBEvent, putDBMatches } from "../../utils/Idb.ts";
import { trpc } from "../../utils/Trpc.tsx";
import { omit } from "../../utils/Utils.ts";

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

  const [tbaStatus, setTbaStatus] = useState("");
  const [isaStatus, setIsaStatus] = useState("");

  const getEvent = trpc.events.getEvent.useMutation({
    onSuccess(data) {
      setIsaStatus("Success");

      setEvents([...events.filter((x) => x.eventKey !== data.eventKey), data]);

      putDBEvent(omit("matches", data) as DBEvent);
      putDBMatches(data.matches);
    },
    onError() {
      setIsaStatus("Unknown Problem (check browser console)");
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
              sx={{
                flex: 1,
              }}
              onClick={() => {
                let error = false;
                if (eventKey === "") {
                  setEventKeyError("Cannot be empty");
                  error = true;
                } else {
                  setEventKeyError("");
                }

                if (!error) {
                }
              }}>
              TBA
            </Button>
            <Button
              variant="outlined"
              sx={{
                flex: 2,
              }}
              onClick={async () => {
                let error = false;
                if (eventKey === "") {
                  setEventKeyError("Cannot be empty");
                  error = true;
                } else {
                  setEventKeyError("");
                }

                if (!error) {
                  getEvent.mutate(eventKey);
                }
              }}>
              ISA Server
            </Button>
          </Stack>
          <Box>
            {tbaStatus ? "TBA: " + tbaStatus : ""}
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
