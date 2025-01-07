import { User } from "@isa2025/api/src/utils/dbtypes.ts";
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
import ExportData from "./ExportData.tsx";
import Users from "./users/Users.tsx";
import Util from "./Util.tsx";
import ViewData from "./ViewData.tsx";

export type DataViewerTab =
  | "viewdata"
  | "exportdata"
  | "reviewdata"
  | "users"
  | "util";

type DataViewerLayoutProps = {
  setToken: (
    newToken: string,
    expiresAt: number,
    permLevel: User["permLevel"]
  ) => void;
  permLevel: User["permLevel"];
};
export default function DataViewerLayout({
  setToken,
  permLevel,
}: DataViewerLayoutProps) {
  const topBarHeightRem = 4;
  const navigate = useNavigate();
  const [tab, setTab] = useState<DataViewerTab>("viewdata");

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
                <Box
                  sx={{
                    flex: 1,
                    width: 1,
                    overflow: "scroll",
                  }}>
                  {(() => {
                    console.log(tab);
                    const tabPanels = [];
                    if (
                      ["demo", "team", "datamanage", "admin"].includes(
                        permLevel
                      )
                    ) {
                      tabPanels.push(
                        <ViewData
                          key={"viewdata"}
                          hidden={tab !== "viewdata"}
                          logoutFunction={logout}
                        />
                      );
                    }
                    if (["team", "datamanage", "admin"].includes(permLevel)) {
                      tabPanels.push(
                        <ExportData
                          key={"exportdata"}
                          hidden={tab !== "exportdata"}
                        />
                      );
                    }
                    if (["datamanage", "admin"].includes(permLevel)) {
                      tabPanels.push(
                        <Box
                          key={"reviewdata"}
                          sx={{
                            display: tab !== "reviewdata" ? "none" : "block",
                          }}>
                          Review Data
                        </Box>
                      );
                    }
                    if (["admin"].includes(permLevel)) {
                      tabPanels.push(
                        <Users
                          key={"users"}
                          hidden={tab !== "users"}
                          logoutFunction={logout}
                        />
                      );
                    }
                    if (["admin"].includes(permLevel)) {
                      tabPanels.push(
                        <Util
                          key={"util"}
                          hidden={tab !== "util"}
                        />
                      );
                    }
                    return tabPanels;
                  })()}
                </Box>
              </Stack>
            </TabContext>
          )}
        </GridBorder>
      </Box>
    </Box>
  );
}
