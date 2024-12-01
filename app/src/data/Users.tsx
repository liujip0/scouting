import { UserColumn, UserColumns } from "@isa2025/api/src/dbtypes.ts";
import { Delete, Edit } from "@mui/icons-material";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
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

  const [editUser, setEditUser] = useState("");
  const [editUserUsername, setEditUserUsername] = useState("");
  const openEditUser = (username: string) => {
    setEditUser(username);
    setEditUserUsername(username);
  };
  const closeEditUser = () => {
    setEditUser("");
    setEditUserUsername("");
  };

  const users = trpc.users.useQuery();

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
          <TextField
            value={editUserUsername}
            onChange={(event) => {
              setEditUserUsername(event.currentTarget.value);
            }}
            label="Username"
          />
        </DialogContent>
      </Dialog>
    </BoxTabPanel>
  );
}
