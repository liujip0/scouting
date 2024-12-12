import { Stack } from "@mui/material";

type ExportDataProps = {
  hidden: boolean;
};
export default function ExportData({ hidden }: ExportDataProps) {
  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        padding: 2,
        display: hidden ? "none" : "flex",
      }}
      direction="row"></Stack>
  );
}
