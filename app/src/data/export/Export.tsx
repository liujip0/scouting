import {
  HumanPlayerEntryColumns,
  TeamMatchEntryColumns,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link, Route, Routes, useResolvedPath } from "react-router-dom";
import { trpc } from "../../utils/Trpc.tsx";
import ExportLayout from "./ExportLayout.tsx";

export default function Export() {
  const [showPublicApiToken, setShowPublicApiToken] = useState(false);
  const [linkIncludesToken, setLinkIncludesToken] = useState(false);
  const [showAuthorization, setShowAuthorization] = useState(false);

  const resolvedPath = useResolvedPath("");
  const pathend = resolvedPath.pathname.split("/").pop();

  const publicApiToken = trpc.users.publicApiToken.useQuery();

  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        padding: 2,
      }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={pathend === "" ? "/" : pathend}>
          <Tab
            label="Robot Data"
            value="robots"
            component={Link}
            to={
              resolvedPath.pathname.split("/").slice(0, -1).join("/") +
              "/robots"
            }
          />
          <Tab
            label="Human Data"
            value="humans"
            component={Link}
            to={
              resolvedPath.pathname.split("/").slice(0, -1).join("/") +
              "/humans"
            }
          />
          <Tab
            label="All Data"
            value="/"
            component={Link}
            to={resolvedPath.pathname.split("/").slice(0, -1).join("/") + "/"}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "scroll",
        }}>
        <Routes>
          <Route
            path="robots"
            element={
              <ExportLayout
                showPublicApiToken={showPublicApiToken}
                setShowPublicApiToken={setShowPublicApiToken}
                linkIncludesToken={linkIncludesToken}
                setLinkIncludesToken={setLinkIncludesToken}
                showAuthorization={showAuthorization}
                setShowAuthorization={setShowAuthorization}
                publicApiToken={publicApiToken.data}
                robotColumnsInit={TeamMatchEntryColumns}
                humanColumnsInit={[]}
                linkBase="/public/robots/"
              />
            }
          />
          <Route
            path="humans"
            element={
              <ExportLayout
                showPublicApiToken={showPublicApiToken}
                setShowPublicApiToken={setShowPublicApiToken}
                linkIncludesToken={linkIncludesToken}
                setLinkIncludesToken={setLinkIncludesToken}
                showAuthorization={showAuthorization}
                setShowAuthorization={setShowAuthorization}
                publicApiToken={publicApiToken.data}
                robotColumnsInit={[]}
                humanColumnsInit={HumanPlayerEntryColumns}
                linkBase="/public/humans/"
              />
            }
          />
          <Route
            path="/"
            element={
              <ExportLayout
                showPublicApiToken={showPublicApiToken}
                setShowPublicApiToken={setShowPublicApiToken}
                linkIncludesToken={linkIncludesToken}
                setLinkIncludesToken={setLinkIncludesToken}
                showAuthorization={showAuthorization}
                setShowAuthorization={setShowAuthorization}
                publicApiToken={publicApiToken.data}
                robotColumnsInit={TeamMatchEntryColumns}
                humanColumnsInit={HumanPlayerEntryColumns}
                linkBase="/public/all/"
              />
            }
          />
        </Routes>
      </Box>
    </Stack>
  );
}
