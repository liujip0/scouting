import { initTRPC } from "@trpc/server";
import { Context } from "./context.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
const publicProcedure = t.procedure;

export const loggedPublicProcedure = publicProcedure.use(async (opts) => {
  const start = Date.now();
  const result = await opts.next();
  const durationMs = Date.now() - start;
  const logResult = await opts.ctx.env.DB.prepare(
    "INSERT INTO ApiLogs(callTime, callDuration, callPath, callType, callInput, callOutput) VALUES (?, ?, ?, ?, ?, ?)"
  )
    .bind(start, durationMs, opts.path, opts.type, opts.input, result.ok)
    .run();
  console.log("Log Success:", logResult.success);
  return result;
});
