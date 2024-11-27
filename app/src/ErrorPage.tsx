import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function ErrorPage() {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        backgroundColor: "background.default",
        padding: 4,
      }}>
      <Typography variant="h1">Error!</Typography>
      <Typography>The app has encountered an error. Try reloading.</Typography>
      <Typography>
        If the problem persists, ping @liujip0 in the ISA Discord Server and
        describe what happened before you got here.
      </Typography>
    </Box>
  );
}
