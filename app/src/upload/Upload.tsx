import { FileUpload } from "@mui/icons-material";
import { Button, Stack, styled } from "@mui/material";

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
              for (let file of event.currentTarget.files) {
                const match = JSON.parse(await file.text());
              }
            }
          }}
          multiple
        />
      </Button>
    </Stack>
  );
}
