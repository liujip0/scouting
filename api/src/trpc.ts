import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const loggedPublicProcedure = publicProcedure.use(async (opts) => {
  //TODO: Uncomment when logging is actually needed (also keep in mind Cloudflare does have built-in logging already)
  // const start = Date.now();
  const result = await opts.next();
  // const durationMs = Date.now() - start;
  // const log = {
  //   time: start,
  //   duration: durationMs,
  //   apiPath: opts.path,
  //   trpcType: opts.type,
  //   input: opts.input,
  //   success: result.ok,
  // };
  // console.log(
  //   result.ok ? { ...log, data: result.data } : { ...log, error: result.error }
  // );
  return result;
});

export const authedLoggedProcedure = loggedPublicProcedure.use(async (opts) => {
  const token = opts.ctx.req.headers.get("authorization");
  const session = await opts.ctx.env.DB.prepare(
    "SELECT sessionId, expiresAt FROM UserSessions WHERE token = ? LIMIT 1;"
  )
    .bind(token)
    .run<{ sessionId: string; expiresAt: number }>();
  if (!session.error && session.results[0]) {
    if (session.results[0].expiresAt! > Date.now()) {
      const result = await opts.next();
      return result;
    } else {
      await opts.ctx.env.DB.prepare(
        "DELETE FROM UserSessions WHERE token = ? LIMIT 1;"
      )
        .bind(token)
        .run();
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Token expired. Please login again.",
      });
    }
  } else {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid or missing token. Please login.",
    });
  }
});
