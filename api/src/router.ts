import { z } from "zod";
import { authRouter } from "./auth/router.ts";
import { dataRouter } from "./data/router.ts";
import { loggedPublicProcedure, publicProcedure, router } from "./trpc.ts";

export const appRouter = router({
  hello: loggedPublicProcedure
    .input(z.string().nullish())
    .query(({ input }) => {
      return `hello ${input}`;
    }),
  getUserById: loggedPublicProcedure.input(z.string()).query(() => {
    return "arkghlerkghlerk";
  }),
  test: publicProcedure.query(() => {
    return "ksdjaskdjflkjahsdfd";
  }),
  logTest: loggedPublicProcedure.query(() => {
    return "kjhsrlgkjhlaekgjh";
  }),
  auth: authRouter,
  data: dataRouter,
});

export type AppRouter = typeof appRouter;
