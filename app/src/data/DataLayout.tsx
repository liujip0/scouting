import { User } from "@isa2025/api/src/utils/dbtypes.ts";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  borderMarginPx,
  borderWidthPx,
  GridBorder,
} from "../components/GridBorder.tsx";

type DataLayoutProps = {
  setToken: (
    newToken: string,
    expiresAt: number,
    permLevel: User["permLevel"]
  ) => void;
  level: "menu" | "page";
  children?: React.ReactNode;
};
export default function DataLayout({
  setToken,
  level,
  children,
}: DataLayoutProps) {
  const topBarHeightRem = 4;

  const navigate = useNavigate();
  const logout = () => {
    setToken("", 0, "none");
  };

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
      }}>
      <AppBar
        color="primary"
        sx={{
          height: `${topBarHeightRem}rem`,
        }}>
        <Toolbar
          sx={{
            alignItems: "center",
            flex: 1,
          }}>
          <Avatar
            alt="ISA Logo"
            src="/logo.svg"
            sx={{
              borderColor: "primary.main",
              borderStyle: "solid",
              borderWidth: "2px",
              mr: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              flex: 1,
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.4rem",
                lg: "1.6rem",
                xl: "1.6rem",
              },
            }}>
            Indiana Scouting Alliance
          </Typography>
          <Button
            onClick={() => {
              navigate(level === "menu" ? "/" : "/data");
            }}
            variant="outlined"
            color="secondary"
            sx={{
              mr: 2,
            }}>
            {level === "menu" ? "Return to Home" : "Return"}
          </Button>
          <Button
            onClick={() => {
              logout();
            }}
            variant="outlined"
            color="secondary">
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: 1,
          height: `calc(calc(100% - ${topBarHeightRem}rem) + ${borderMarginPx + borderWidthPx}px)`,
          position: "relative",
          top: `calc(${topBarHeightRem}rem - ${borderMarginPx + borderWidthPx}px)`,
        }}>
        <GridBorder>{children}</GridBorder>
      </Box>
    </Box>
  );
}
