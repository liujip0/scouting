import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  borderMarginPx,
  borderWidthPx,
  GridBorder,
} from "../common/Components.tsx";
import { setToken } from "./ViewData.tsx";

type DataViewerLayoutProps = {
  setLoggedIn: (value: boolean) => void;
};
export default function DataViewerLayout({
  setLoggedIn,
}: DataViewerLayoutProps) {
  const topBarHeightRem = 4;
  const navigate = useNavigate();
  const [tab, setTab] = useState<"data" | "accounts">("data");
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
            fontSize="large"
            sx={{
              flex: 1,
            }}>
            Indiana Scouting Alliance
          </Typography>
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="outlined"
            color="secondary"
            sx={{
              mr: 2,
            }}>
            Return to Home
          </Button>
          <Button
            onClick={() => {
              setToken("", 0);
              setLoggedIn(false);
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
        <GridBorder>
          <TabContext value={tab}>
            <Box>
              <TabList
                onChange={(_event, value) => {
                  setTab(value);
                }}>
                <Tab
                  label="Data"
                  value="data"
                />
                <Tab
                  label="Manage Accounts"
                  value="accounts"
                />
              </TabList>
            </Box>
            <TabPanel value="data">Data</TabPanel>
            <TabPanel value="accounts">Accounts</TabPanel>
          </TabContext>
        </GridBorder>
      </Box>
    </Box>
  );
}
