import {
  User,
  UserColumn,
  UserColumns,
  UserPermLevel,
} from "@isa2025/api/src/dbtypes.ts";
import {
  ContentCopy,
  Delete,
  Edit,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BorderedTable, Td, Th } from "../components/Table.tsx";
import { trpc } from "../utils/Trpc.tsx";

export default function Users() {
  const [showApiTokens, setShowApiTokens] = useState(false);

  const users = trpc.users.users.useQuery();

  const [editUserUsername, setEditUserUsername] = useState<string | null>(null);
  const [editUserPermLevel, setEditUserPermLevel] = useState<
    User["permLevel"] | null
  >(null);
  const [editUserShowApiToken, setEditUserShowApiToken] = useState(false);
  const openEditUser = (username: string) => {
    setEditUserPermLevel(
      users.data?.filter((user) => user.username === username)[0].permLevel ??
        null
    );
    setEditUserShowApiToken(false);
    setEditUserUsername(username);
  };
  const closeEditUser = () => {
    setEditUserPermLevel(null);
    setEditUserShowApiToken(false);
    setEditUserUsername(null);
  };

  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
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
                        <Typography>{user[column as UserColumn]}</Typography>
                      : <TextField
                          value={user.publicApiToken}
                          slotProps={{
                            input: {
                              endAdornment: (
                                <IconButton
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      user.publicApiToken
                                    );
                                  }}>
                                  <ContentCopy />
                                </IconButton>
                              ),
                            },
                          }}
                          type={showApiTokens ? "text" : "password"}
                          disabled
                          variant="standard"
                          sx={(theme) => {
                            return {
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: theme.palette.text.primary,
                                color: theme.palette.text.primary,
                              },
                            };
                          }}
                        />
                      }
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
        open={editUserUsername !== null}
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
            <TextField
              value={
                users.data?.filter(
                  (user) => user.username === editUserUsername
                )[0]?.publicApiToken ?? ""
              }
              disabled
              type={editUserShowApiToken ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setEditUserShowApiToken(!editUserShowApiToken);
                        }}>
                        {editUserShowApiToken ?
                          <VisibilityOff color="primary" />
                        : <Visibility color="primary" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              label="publicApiToken"
              sx={(theme) => {
                return {
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: theme.palette.text.primary,
                    color: theme.palette.text.primary,
                  },
                };
              }}
            />
          </Stack>
          <FormControlLabel
            control={<Checkbox />}
            label="Regenerate publicApiToken"
          />
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
    </Stack>
  );
}
