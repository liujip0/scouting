import { router } from "../trpc.ts";
import { createUser } from "./createUser.ts";
import { editUser } from "./editUser.ts";
import { publicApiToken } from "./publicApiToken.ts";
import { users } from "./users.ts";

export const usersRouter = router({
  users: users,
  editUser: editUser,
  publicApiToken: publicApiToken,
  createUser: createUser,
});
