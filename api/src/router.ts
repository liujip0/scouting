import { authRouter } from "./auth/router.ts";
import { data } from "./data.ts";
import { router } from "./trpc.ts";
import { users } from "./users.ts";

export const appRouter = router({
  auth: authRouter,
  data: data,
  users: users,
});

export type AppRouter = typeof appRouter;
