import { authRouter } from "./auth/router.ts";
import { router } from "./trpc.ts";

export const appRouter = router({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
