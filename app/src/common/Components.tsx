import Box from "@mui/material/Box";

type GridBorderProps = {
  children: React.ReactNode;
};
export function GridBorder({ children }: GridBorderProps) {
  const borderMarginPx = 20;
  const borderWidthPx = 5;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `${borderMarginPx}px 1fr ${borderMarginPx}px`,
        gridTemplateRows: `${borderMarginPx}px 1fr ${borderMarginPx}px`,
        columnGap: `${borderWidthPx}px`,
        rowGap: `${borderWidthPx}px`,
        width: 1,
        height: 1,
        boxSizing: "content-box",
        backgroundColor: "primary.main",
      }}>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 1,
          backgroundColor: "secondary.main",
        }}></Box>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 1,
          backgroundColor: "secondary.main",
        }}></Box>
      <Box
        sx={{
          gridColumn: 3,
          gridRow: 1,
          backgroundColor: "secondary.main",
        }}></Box>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 2,
          backgroundColor: "secondary.main",
        }}></Box>
      <Box
        sx={{
          gridColumn: 3,
          gridRow: 2,
          backgroundColor: "secondary.main",
        }}></Box>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 3,
          backgroundColor: "secondary.main",
        }}></Box>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 3,
          backgroundColor: "secondary.main",
        }}></Box>
      <Box
        sx={{
          gridColumn: 3,
          gridRow: 3,
          backgroundColor: "secondary.main",
        }}></Box>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 2,
          backgroundColor: "secondary.main",
        }}>
        {children}
      </Box>
    </Box>
  );
}
