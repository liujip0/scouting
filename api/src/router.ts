import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { Context } from "./context.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `hello ${input ?? "world"}`;
  }),
});

export type AppRouter = typeof appRouter;
