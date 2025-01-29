import { TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { trpc } from "../../utils/Trpc.tsx";
import ExportLayout from "./ExportLayout.tsx";

export default function Export() {
  const [showPublicApiToken, setShowPublicApiToken] = useState(false);
  const [linkIncludesToken, setLinkIncludesToken] = useState(false);
  const [showAuthorization, setShowAuthorization] = useState(false);

  const location = useLocation();
  const pathend = location.pathname.split("/").pop();
  const publicApiToken = trpc.users.publicApiToken.useQuery();

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        padding: 2,
      }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={pathname}>
          <Tab
            label="Robot Data"
            value="robot"
          />
          <Tab
            label="Human Data"
            value="human"
          />
          <Tab
            label="All Data"
            value="all"
          />
        </Tabs>
      </Box>
      <TabPanel value="robot">
        <ExportLayout />
      </TabPanel>
      <TabPanel value="human">
        <ExportLayout />
      </TabPanel>
      <TabPanel value="all">
        <ExportLayout />
      </TabPanel>
    </Box>
  );
}
