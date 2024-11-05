import { initTRPC } from "@trpc/server";
import { Context } from "./context.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const loggedPublicProcedure = publicProcedure.use(async (opts) => {
  const start = Date.now();
  const result = await opts.next();
  const durationMs = Date.now() - start;
  console.log({
    time: start,
    duration: durationMs,
    apiPath: opts.path,
    trpcType: opts.type,
    input: opts.input,
    result: result,
  });
  return result;
});
