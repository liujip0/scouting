import { router } from "../trpc.ts";
import { publicApiToken } from "./publicApiToken.ts";
import { users } from "./users.ts";

export const usersRouter = router({
  users: users,
  publicApiToken: publicApiToken,
});
