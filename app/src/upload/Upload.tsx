import {
  HumanPlayerEntry,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { FileUpload } from "@mui/icons-material";
import { Button, Stack, styled } from "@mui/material";
import { useState } from "react";
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
  const putEntries = trpc.data.putEntries.useMutation();

  const [popup, setPopup] = useState("");

  const [json, setJson] = useState("");

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

              for (let file of event.currentTarget.files) {
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
      <Button>Paste from Clipboard</Button>
    </Stack>
  );
}
