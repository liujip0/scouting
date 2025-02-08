import {
  CommonEntryColumns,
  HumanPlayerEntry,
  HumanPlayerEntryColumn,
  TeamMatchEntry,
  TeamMatchEntryColumn,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { FileUpload } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trpc } from "../utils/Trpc.tsx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Upload() {
  const navigate = useNavigate();
  const putEntries = trpc.data.putEntries.useMutation();

  const [qrUpload, setQrUpload] = useState(false);
  const [qrData, setQrData] = useState("");

  return (
    <Stack
      sx={{
        backgroundColor: "background.default",
        width: 1,
        height: 1,
      }}>
      <Button
        component="label"
        startIcon={<FileUpload />}>
        Upload TXT Files
        <VisuallyHiddenInput
          type="file"
          accept="text/plain"
          onChange={async (event) => {
            if (event.currentTarget.files) {
              const matches: (TeamMatchEntry | HumanPlayerEntry)[] = [];

              for (const file of event.currentTarget.files) {
                const match = JSON.parse(await file.text());
                console.log(match);
                matches.push(match);
              }

              putEntries.mutate(matches);
            }
          }}
          multiple
        />
      </Button>

      <Button
        onClick={async () => {
          const matches = JSON.parse(await navigator.clipboard.readText());
          putEntries.mutate(matches);
        }}>
        Paste from Clipboard
      </Button>

      <Button
        onClick={() => {
          setQrUpload(true);
        }}>
        Scan QR with Scanner
      </Button>
      <Dialog open={qrUpload}>
        <DialogTitle>Scan QR Codes</DialogTitle>
        <DialogContent>
          <TextField multiline />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setQrUpload(false);
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const matchArrs: string[] = qrData.split("`");
              matchArrs.pop();
              const matches: (TeamMatchEntry | HumanPlayerEntry)[] =
                matchArrs.map((match) => {
                  const matchArr = JSON.parse(match);
                  const parsedMatch: Partial<
                    Record<
                      TeamMatchEntryColumn | HumanPlayerEntryColumn,
                      unknown
                    >
                  > = {};
                  CommonEntryColumns.forEach((column, columnIndex) => {
                    parsedMatch[column] = matchArr[columnIndex];
                  });
                  return parsedMatch as TeamMatchEntry | HumanPlayerEntry;
                });
              setQrData("");
              setQrUpload(false);
            }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        onClick={() => {
          //TODO
        }}>
        Scan QR with Camera
      </Button>

      <Button
        onClick={() => {
          navigate("/");
        }}>
        Return to Home
      </Button>
    </Stack>
  );
}
