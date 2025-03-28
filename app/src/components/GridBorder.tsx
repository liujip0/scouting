import { Box } from "@mui/material";
import BackdropComponent from "./BackdropComponent.tsx";

export const borderMarginPx = 20;
export const borderWidthPx = 5;

type GridBorderProps = {
  backdrop?: boolean;
  onCloseBackdrop?: () => void;
  children?: React.ReactNode;
};
export function GridBorder({
  backdrop = false,
  onCloseBackdrop,
  children,
}: GridBorderProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `${borderMarginPx}px calc(calc(100% - ${2 * borderMarginPx}px) - ${2 * borderWidthPx}px) ${borderMarginPx}px`,
        gridTemplateRows: `${borderMarginPx}px calc(calc(100% - ${2 * borderMarginPx}px) - ${2 * borderWidthPx}px) ${borderMarginPx}px`,
        columnGap: `${borderWidthPx}px`,
        rowGap: `${borderWidthPx}px`,
        width: 1,
        height: 1,
        backgroundColor: "primary.main",
      }}>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 1,
          backgroundColor: "background.default",
          position: "relative",
        }}>
        <BackdropComponent
          open={backdrop}
          onClose={onCloseBackdrop}
        />
      </Box>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 1,
          backgroundColor: "background.default",
          position: "relative",
        }}>
        <BackdropComponent
          open={backdrop}
          onClose={onCloseBackdrop}
        />
      </Box>
      <Box
        sx={{
          gridColumn: 3,
          gridRow: 1,
          backgroundColor: "background.default",
          position: "relative",
        }}>
        <BackdropComponent
          open={backdrop}
          onClose={onCloseBackdrop}
        />
      </Box>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 2,
          backgroundColor: "background.default",
          position: "relative",
        }}>
        <BackdropComponent
          open={backdrop}
          onClose={onCloseBackdrop}
        />
      </Box>
      <Box
        sx={{
          gridColumn: 3,
          gridRow: 2,
          backgroundColor: "background.default",
          position: "relative",
        }}>
        <BackdropComponent
          open={backdrop}
          onClose={onCloseBackdrop}
        />
      </Box>
      <Box
        sx={{
          gridColumn: 1,
          gridRow: 3,
          backgroundColor: "background.default",
          position: "relative",
        }}>
        <BackdropComponent
          open={backdrop}
          onClose={onCloseBackdrop}
        />
      </Box>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 3,
          backgroundColor: "background.default",
          position: "relative",
        }}>
        <BackdropComponent
          open={backdrop}
          onClose={onCloseBackdrop}
        />
      </Box>
      <Box
        sx={{
          gridColumn: 3,
          gridRow: 3,
          backgroundColor: "background.default",
          position: "relative",
        }}>
        <BackdropComponent
          open={backdrop}
          onClose={onCloseBackdrop}
        />
      </Box>
      <Box
        sx={{
          gridColumn: 2,
          gridRow: 2,
          backgroundColor: "background.default",
        }}>
        {children}
      </Box>
    </Box>
  );
}
