import { User, UserPermLevel } from "@isa2025/api/src/utils/dbtypes.ts";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { trpc } from "../../utils/Trpc.tsx";

type EditUserProps = {
  editUserUsername: string | null;
  setEditUserUsername: (value: string | null) => void;
  editUserOldUsername: string | null;
  editUserPermLevel: User["permLevel"] | undefined;
  setEditUserPermLevel: (value: User["permLevel"] | undefined) => void;
  closeEditUser: () => void;
  refreshUsers: () => void;
};
export default function EditUser({
  editUserUsername,
  setEditUserUsername,
  editUserOldUsername,
  editUserPermLevel,
  setEditUserPermLevel,
  closeEditUser,
  refreshUsers,
}: EditUserProps) {
  const editUser = trpc.users.editUser.useMutation({
    onSuccess() {
      refreshUsers();
    },
  });
  const [editUserUsernameError, setEditUserUsernameError] = useState("");

  return (
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
            helperText={editUserUsernameError}
            error={editUserUsernameError !== ""}
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
            let error = false;

            if (!editUserUsername) {
              setEditUserUsernameError("Cannot be empty");
              error = true;
            } else {
              setEditUserUsernameError("");
            }

            if (!error) {
              editUser.mutate({
                oldUsername: editUserOldUsername!,
                newUsername: editUserUsername!,
                permLevel: editUserPermLevel!,
              });
              closeEditUser();
            }
          }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
