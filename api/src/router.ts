import { z } from "zod";
import { loggedPublicProcedure, router } from "./trpc.ts";

export const appRouter = router({
  hello: loggedPublicProcedure
    .input(z.string().nullish())
    .query(({ input }) => {
      return `hello ${input ?? "world"}`;
    }),
});

export type AppRouter = typeof appRouter;
