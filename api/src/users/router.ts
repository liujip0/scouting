import { router } from "../trpc.ts";
import { users } from "./users.ts";

export const usersRouter = router({
  users: users,
});
