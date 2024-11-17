import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function DataViewerLayout() {
  const [tab, setTab] = useState<"data" | "accounts">("data");
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
      }}>
      <AppBar
        position="static"
        sx={{
          display: "flex",
        }}>
        <Toolbar>
          <TrendingUpIcon fontSize="large" />
          <Typography
            variant="h2"
            fontSize="large">
            Indiana Scouting Alliance
          </Typography>
        </Toolbar>
      </AppBar>
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
    </Box>
  );
}
