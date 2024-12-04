import { User } from "@isa2025/api/src/dbtypes.ts";
import { TabContext, TabList } from "@mui/lab";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Stack,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  borderMarginPx,
  borderWidthPx,
  GridBorder,
} from "../components/GridBorder.tsx";
import { trpc } from "../utils/Trpc.tsx";
import { setToken, token } from "./Data.tsx";
import Users from "./Users.tsx";
import Util from "./Util.tsx";
import ViewData from "./ViewData.tsx";

export type DataViewerTab =
  | "viewdata"
  | "exportdata"
  | "reviewdata"
  | "users"
  | "util";

type DataViewerLayoutProps = {
  setLoggedIn: (value: boolean) => void;
  permLevel: User["permLevel"];
  setPermLevel: (value: User["permLevel"]) => void;
};
export default function DataViewerLayout({
  setLoggedIn,
  permLevel,
  setPermLevel,
}: DataViewerLayoutProps) {
  const topBarHeightRem = 4;
  const navigate = useNavigate();
  const [tab, setTab] = useState<DataViewerTab>("viewdata");

  const logout = trpc.auth.logout.useMutation({
    onSuccess() {
      setToken("", 0);
      setPermLevel("none");
      setLoggedIn(false);
    },
    onError() {
      if (token === undefined) {
        setToken("", 0);
        setPermLevel("none");
        setLoggedIn(false);
      }
    },
  });

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
              logout.mutate();
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
          {["demo", "team", "datamanage", "admin"].includes(permLevel) && (
            <TabContext value={tab}>
              <Stack
                sx={{
                  height: 1,
                  width: 1,
                }}>
                <Box
                  sx={{
                    width: 1,
                  }}>
                  {permLevel === "demo" ?
                    <TabList
                      onChange={(_event, value) => {
                        setTab(value);
                      }}
                      variant="scrollable"
                      scrollButtons="auto"
                      allowScrollButtonsMobile>
                      <Tab
                        label="View Data"
                        value="viewdata"
                      />
                    </TabList>
                  : permLevel === "team" ?
                    <TabList
                      onChange={(_event, value) => {
                        setTab(value);
                      }}
                      variant="scrollable"
                      scrollButtons="auto"
                      allowScrollButtonsMobile>
                      <Tab
                        label="View Data"
                        value="viewdata"
                      />
                      <Tab
                        label="Export Data"
                        value="exportdata"
                      />
                    </TabList>
                  : permLevel === "datamanage" ?
                    <TabList
                      onChange={(_event, value) => {
                        setTab(value);
                      }}
                      variant="scrollable"
                      scrollButtons="auto"
                      allowScrollButtonsMobile>
                      <Tab
                        label="View Data"
                        value="viewdata"
                      />
                      <Tab
                        label="Export Data"
                        value="exportdata"
                      />
                      <Tab
                        label="Review Data"
                        value="reviewdata"
                      />
                    </TabList>
                  : permLevel === "admin" && (
                      <TabList
                        onChange={(_event, value) => {
                          setTab(value);
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile>
                        <Tab
                          label="View Data"
                          value="viewdata"
                        />
                        <Tab
                          label="Export Data"
                          value="exportdata"
                        />
                        <Tab
                          label="Review Data"
                          value="reviewdata"
                        />
                        <Tab
                          label="Manage Users"
                          value="users"
                        />
                        <Tab
                          label="Util"
                          value="util"
                        />
                      </TabList>
                    )
                  }
                </Box>
                {(() => {
                  switch (tab) {
                    case "viewdata": {
                      if (
                        ["demo", "team", "datamanage", "admin"].includes(
                          permLevel
                        )
                      ) {
                        return <ViewData />;
                      }
                      break;
                    }
                    case "exportdata": {
                      if (["team", "datamanage", "admin"].includes(permLevel)) {
                        return <Box>Export</Box>;
                      }
                      break;
                    }
                    case "reviewdata": {
                      if (["datamanage", "admin"].includes(permLevel)) {
                        return <Box>Review Data</Box>;
                      }
                      break;
                    }
                    case "users": {
                      if (["admin"].includes(permLevel)) {
                        return <Users />;
                      }
                      break;
                    }
                    case "util": {
                      if (["admin"].includes(permLevel)) {
                        return <Util />;
                      }
                      break;
                    }
                  }
                })()}
              </Stack>
            </TabContext>
          )}
        </GridBorder>
      </Box>
    </Box>
  );
}
