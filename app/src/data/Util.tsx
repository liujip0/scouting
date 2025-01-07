import { Stack } from "@mui/material";

type UtilProps = {
  hidden: boolean;
};
export default function Util({ hidden }: UtilProps) {
  return (
    <Stack
      gap={2}
      sx={{
        display: hidden ? "none" : "flex",
      }}>
      Util
    </Stack>
  );
}
