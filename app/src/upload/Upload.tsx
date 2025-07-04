import {
  CommonEntryColumns,
  HumanPlayerEntry,
  HumanPlayerEntryColumn,
  HumanPlayerEntryColumns,
  TeamMatchEntry,
  TeamMatchEntryColumn,
  TeamMatchEntryColumns,
} from "@isa2025/api/src/utils/dbtypes.ts";
import {
  Close,
  ContentPaste,
  FileUpload,
  FolderSpecial,
  Home,
  QrCodeScanner,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VisuallyHiddenInput } from "../components/VisuallyHiddenInput.tsx";
import { putDBEntry } from "../utils/idb.ts";
import { trpc } from "../utils/trpc.ts";

export const QRCODE_UPLOAD_DELIMITER = "`";

export default function Upload() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const [data, setData] = useState<(TeamMatchEntry | HumanPlayerEntry)[]>([]);
  const [putEntriesPending, setPutEntriesPending] = useState(false);
  let putEntriesTimeout: NodeJS.Timeout;
  const putEntries = trpc.data.putEntries.useMutation({
    onMutate() {
      setStatus("Uploading...");
      clearTimeout(putEntriesTimeout);
      putEntriesTimeout = setTimeout(async () => {
        if (putEntriesPending) {
          putEntries.reset();
          data.forEach(async (match) => {
            await putDBEntry({
              ...match,
              autoUpload: false,
              quickshare: false,
              clipboard: false,
              qr: false,
              download: false,
              upload: false,
            });
          });
          setStatus("Error uploading. Matches saved locally.");
        }
      }, 3000);
    },
    async onSuccess() {
      clearTimeout(putEntriesTimeout);
      data.forEach(async (match) => {
        await putDBEntry({
          ...match,
          autoUpload: true,
          quickshare: false,
          clipboard: false,
          qr: false,
          download: false,
          upload: false,
        });
      });
      setPutEntriesPending(false);
      setStatus("Success!");
    },
    async onError(error) {
      clearTimeout(putEntriesTimeout);
      data.forEach(async (match) => {
        await putDBEntry({
          ...match,
          autoUpload: false,
          quickshare: false,
          clipboard: false,
          qr: false,
          download: false,
          upload: false,
        });
      });
      console.error(error);
      if (error.message === "NetworkError when attempting to fetch resource.") {
        setStatus("No network connection. Matches saved locally.");
      } else {
        setStatus(error.message);
      }
      setPutEntriesPending(false);
    },
  });

  const [qrUpload, setQrUpload] = useState(false);
  const [qrData, setQrData] = useState("");

  return (
    <Stack
      sx={{
        backgroundColor: "background.default",
        width: 1,
        height: 1,
      }}>
      <Snackbar
        open={status !== ""}
        autoHideDuration={5000}
        onClose={() => {
          setStatus("");
        }}
        message={status}
        action={
          <IconButton
            onClick={() => {
              setStatus("");
            }}>
            <Close
              sx={{
                color: "#ffffff",
              }}
            />
          </IconButton>
        }
      />

      <Button
        component="label"
        startIcon={<FileUpload />}
        disabled={putEntriesPending}>
        Upload TXT Files
        <VisuallyHiddenInput
          type="file"
          accept="text/plain"
          onChange={async (event) => {
            if (event.currentTarget.files) {
              const matches: (TeamMatchEntry | HumanPlayerEntry)[] = [];

              try {
                for (const file of event.currentTarget.files) {
                  const match = JSON.parse(await file.text());
                  console.log(match);
                  matches.push(match);
                }
              } catch (error) {
                setStatus("Error parsing file(s): " + error);
                return;
              }

              setData(matches);
              putEntries.mutate(matches);
            }
          }}
          multiple
        />
      </Button>

      <Button
        onClick={async () => {
          try {
            const matches = JSON.parse(
              await navigator.clipboard.readText()
            ) as (TeamMatchEntry | HumanPlayerEntry)[];

            setData(matches);
            putEntries.mutate(matches);
          } catch (error) {
            setStatus("Error reading clipboard: " + error);
          }
        }}
        startIcon={<ContentPaste />}
        disabled={putEntriesPending}>
        Upload from Clipboard
      </Button>

      <Button
        onClick={() => {
          setQrUpload(true);
        }}
        startIcon={<QrCodeScanner />}
        disabled={putEntriesPending}>
        Upload from QR
      </Button>
      <Dialog open={qrUpload}>
        <DialogTitle>Scan QR Codes</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            value={qrData}
            onChange={(event) => {
              setQrData(event.currentTarget.value);
            }}
            helperText={
              "1.Connect the QR code scanner\u00a0\u00a02.Focus the textbox\u00a0\u00a03.Scan QR codes"
            }
          />
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
              const matchArrs: string[] = qrData
                .split(QRCODE_UPLOAD_DELIMITER)
                .filter((x) => x.trim() !== "");
              try {
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
                    if (parsedMatch.robotNumber === 4) {
                      HumanPlayerEntryColumns.forEach((column, columnIndex) => {
                        parsedMatch[column] = matchArr[columnIndex];
                      });
                    } else {
                      TeamMatchEntryColumns.forEach((column, columnIndex) => {
                        parsedMatch[column] = matchArr[columnIndex];
                      });
                    }
                    console.log(parsedMatch);
                    return parsedMatch as TeamMatchEntry | HumanPlayerEntry;
                  });

                setData(matches);
                putEntries.mutate(matches);
              } catch (error) {
                setStatus("Error parsing QR code: " + error);
              } finally {
                setQrData("");
                setQrUpload(false);
              }
            }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Button
        onClick={() => {
          //TODO
        }}
        startIcon={<CameraAlt />}>
        Scan QR with Camera
      </Button> */}

      <Button onClick={() => {}}>&nbsp;</Button>

      <Button
        onClick={() => {
          navigate("/");
        }}
        startIcon={<Home />}>
        Return to Home
      </Button>
      <Button
        onClick={() => {
          navigate("/scout/savedmatches");
        }}
        startIcon={<FolderSpecial />}>
        Saved Matches
      </Button>
    </Stack>
  );
}
