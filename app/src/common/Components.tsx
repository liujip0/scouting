import Box from "@mui/material/Box";

export function GridBorder() {
  const borderWidth = 20;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `${borderWidth}px 1fr ${borderWidth}px`,
        gridTemplateRows: `${borderWidth}px 1fr ${borderWidth}px`,
      }}>
      <Box
        sx={{
          gridColumn: "2 / 3",
          gridRow: "1",
        }}></Box>
    </Box>
  );
}
