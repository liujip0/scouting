import { User, UserPermLevel } from "@isa2025/api/src/utils/dbtypes.ts";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { trpc } from "../../utils/trpc.ts";

type CreateUserProps = {
  createUser: boolean;
  setCreateUser: (value: boolean) => void;
  refreshUsers: () => void;
};
export default function CreateUser({
  createUser: showCreateUser,
  setCreateUser,
  refreshUsers,
}: CreateUserProps) {
  const [createUserUsername, setCreateUserUsername] = useState("");
  const [createUserUsernameError, setCreateUserUsernameError] = useState("");
  const [createUserPassword, setCreateUserPassword] = useState("");
  const [createUserShowPassowrd, setCreateUserShowPassword] = useState(false);
  const [createUserPasswordError, setCreateUserPasswordError] = useState("");
  const [createUserPermLevel, setCreateUserPermLevel] =
    useState<User["permLevel"]>("team");
  const createUser = trpc.users.createUser.useMutation({
    onSuccess() {
      refreshUsers();
    },
  });

  return (
    <Dialog
      open={showCreateUser}
      onClose={() => {
        setCreateUser(false);
      }}>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            pt: 2,
          }}
          gap={2}>
          <TextField
            value={createUserUsername}
            onChange={(event) => {
              setCreateUserUsername(event.currentTarget.value);
            }}
            label="Username"
            helperText={createUserUsernameError}
            error={createUserUsernameError !== ""}
          />
          <TextField
            value={createUserPassword}
            onChange={(event) => {
              setCreateUserPassword(event.currentTarget.value);
            }}
            label="Password"
            helperText={createUserPasswordError}
            error={createUserPasswordError !== ""}
            type={createUserShowPassowrd ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setCreateUserShowPassword(!createUserShowPassowrd);
                    }}>
                    {createUserShowPassowrd ?
                      <VisibilityOff />
                    : <Visibility />}
                  </IconButton>
                ),
              },
            }}
          />
          <TextField
            value={createUserPermLevel}
            onChange={(event) => {
              setCreateUserPermLevel(event.target.value as User["permLevel"]);
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
            setCreateUser(false);
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            let error = false;

            if (!createUserUsername) {
              setCreateUserUsernameError("Cannot be empty");
              error = true;
            } else {
              setCreateUserUsernameError("");
            }

            if (!createUserPassword) {
              setCreateUserPasswordError("Cannot be empty");
              error = true;
            } else {
              setCreateUserPasswordError("");
            }

            if (!error) {
              createUser.mutate({
                username: createUserUsername,
                password: createUserPassword,
                permLevel: createUserPermLevel,
              });
              setCreateUser(false);
            }
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
