import { authRouter } from "./auth/router.ts";
import { data } from "./data.ts";
import { router } from "./trpc.ts";

export const appRouter = router({
  auth: authRouter,
  data: data,
});

export type AppRouter = typeof appRouter;
