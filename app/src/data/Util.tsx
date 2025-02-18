import { Close, ContentCopy, Send } from "@mui/icons-material";
import { IconButton, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { trpc } from "../utils/trpc.ts";

export default function Util() {
  const exportData = trpc.maintenance.exportData.useQuery();
  const [importDataString, setImportDataString] = useState("");
  const importData = trpc.maintenance.importData.useMutation();
  const [importDataStatus, setImportDataStatus] = useState("");

  return (
    <Stack
      sx={{
        padding: 4,
      }}
      gap={2}>
      <TextField
        value={JSON.stringify(exportData.data)}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                onClick={() => {
                  if (exportData.data) {
                    navigator.clipboard.writeText(
                      JSON.stringify(exportData.data)
                    );
                  }
                }}>
                <ContentCopy />
              </IconButton>
            ),
          },
          inputLabel: {
            shrink: true,
          },
        }}
        disabled
        label="Stringified Export Data"
        variant="outlined"
        sx={(theme) => {
          return {
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: theme.palette.text.primary,
              color: theme.palette.text.primary,
            },
          };
        }}
      />
      <TextField
        value={importDataString}
        onChange={(event) => {
          setImportDataString(event.currentTarget.value);
        }}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                onClick={() => {
                  importData.mutate(JSON.parse(importDataString));
                }}>
                <Send />
              </IconButton>
            ),
          },
        }}
        label="Stringified Import Data"
        variant="outlined"
      />
      <Snackbar
        open={importDataStatus !== ""}
        autoHideDuration={3000}
        onClose={() => {
          setImportDataStatus("");
        }}
        message={status}
        action={
          <IconButton
            onClick={() => {
              setImportDataStatus("");
            }}>
            <Close
              sx={{
                color: "#ffffff",
              }}
            />
          </IconButton>
        }
      />
    </Stack>
  );
}
