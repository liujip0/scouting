import {
  User,
  UserColumn,
  UserColumns,
  UserPermLevel,
} from "@isa2025/api/src/dbtypes.ts";
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { BorderedTable, Td, Th } from "../components/Table.tsx";
import { trpc } from "../utils/Trpc.tsx";
import { BoxTabPanel, DataViewerTab } from "./DataViewerLayout.tsx";

type UsersProps = {
  tab: DataViewerTab;
};
export default function Users({ tab }: UsersProps) {
  const [showApiTokens, setShowApiTokens] = useState(false);

  const users = trpc.users.useQuery();

  const [editUser, setEditUser] = useState("");
  const [editUserUsername, setEditUserUsername] = useState<string | null>(null);
  const [editUserPermLevel, setEditUserPermLevel] = useState<
    User["permLevel"] | null
  >(null);
  const openEditUser = (username: string) => {
    setEditUserUsername(username);
    setEditUserPermLevel(
      users.data?.filter((user) => user.username === username)[0].permLevel ??
        null
    );
    setEditUser(username);
  };
  const closeEditUser = () => {
    setEditUser("");
    setEditUserUsername(null);
    setEditUserPermLevel(null);
  };

  return (
    <BoxTabPanel
      tab={tab}
      value="users"
      sx={{
        width: 1,
        height: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}>
      <Paper
        sx={{
          padding: 1,
          display: "flex",
          gap: 2,
        }}
        square>
        <FormControlLabel
          control={
            <Checkbox
              checked={showApiTokens}
              onChange={(event) => {
                setShowApiTokens(event.currentTarget.checked);
              }}
            />
          }
          label="Show Public API Tokens"
          sx={{
            pl: 2,
          }}
        />
      </Paper>
      <TableContainer
        sx={{
          width: 1,
          height: 1,
        }}>
        <BorderedTable>
          <TableHead>
            <TableRow>
              {UserColumns.map((column) =>
                column !== "hashedPassword" && column !== "saltToken" ?
                  <Th key={column}>{column}</Th>
                : null
              )}
              <Th>Actions</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data?.map((user) => (
              <TableRow key={user.username}>
                {UserColumns.map((column) =>
                  column !== "hashedPassword" && column !== "saltToken" ?
                    <Td key={column}>
                      {column !== "publicApiToken" ?
                        user[column as UserColumn]
                      : showApiTokens ?
                        user[column as UserColumn]
                      : "-"}
                    </Td>
                  : null
                )}
                <Td>
                  <Stack
                    direction="row"
                    sx={{
                      width: 1,
                      height: 1,
                      justifyContent: "space-around",
                    }}>
                    <IconButton
                      onClick={() => {
                        openEditUser(user.username);
                      }}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton>
                      <Delete color="error" />
                    </IconButton>
                  </Stack>
                </Td>
              </TableRow>
            ))}
          </TableBody>
        </BorderedTable>
      </TableContainer>
      <Dialog
        open={editUser !== ""}
        onClose={() => {
          closeEditUser();
        }}>
        <DialogTitle>Manage User</DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              pt: 2,
            }}
            gap={2}>
            <TextField
              value={editUserUsername}
              onChange={(event) => {
                setEditUserUsername(event.currentTarget.value);
              }}
              label="username"
            />
            <TextField
              value={editUserPermLevel}
              onChange={(event) => {
                setEditUserPermLevel(event.target.value as User["permLevel"]);
              }}
              select
              label="permLevel">
              {UserPermLevel.map((perm) => (
                <MenuItem
                  key={perm}
                  value={perm}>
                  {perm}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeEditUser();
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              closeEditUser();
            }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </BoxTabPanel>
  );
}
