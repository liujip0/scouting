import { initTRPC, TRPCError } from "@trpc/server";
import jwt, { JwtPayload } from "jsonwebtoken";
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
  const token = opts.ctx.req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing token.",
    });
  }

  let tokenPayload: JwtPayload;
  try {
    tokenPayload = jwt.verify(
      token,
      opts.ctx.env.JWT_PRIVATE_KEY
    ) as JwtPayload;
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Token could not be verified.",
    });
  }

  const result = await opts.next({
    ctx: {
      user: tokenPayload.user,
    },
  });
  return result;

  // const session = await opts.ctx.env.DB.prepare(
  //   "SELECT sessionId, expiresAt, username FROM UserSessions WHERE token = ? LIMIT 1;"
  // )
  //   .bind(token)
  //   .run<{
  //     sessionId: string;
  //     expiresAt: number;
  //     username: string;
  //   }>();
  // if (!session.error && session.results[0]) {
  //   if (session.results[0].expiresAt! > Date.now()) {
  //     const userInfo = await opts.ctx.env.DB.prepare(
  //       "SELECT permLevel FROM Users WHERE username = ?"
  //     )
  //       .bind(session.results[0].username)
  //       .first<{
  //         permLevel: User["permLevel"];
  //       }>();
  //     if (!userInfo) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Unable to fetch user info after logging in.",
  //       });
  //     }
  //     const result = await opts.next({
  //       ctx: {
  //         user: {
  //           username: session.results[0].username,
  //           permLevel: userInfo.permLevel,
  //         },
  //       },
  //     });
  //     return result;
  //   } else {
  //     await opts.ctx.env.DB.prepare(
  //       "DELETE FROM UserSessions WHERE token = ? LIMIT 1;"
  //     )
  //       .bind(token)
  //       .run();
  //     throw new TRPCError({
  //       code: "UNAUTHORIZED",
  //       message: "Token expired. Please login again.",
  //     });
  //   }
  // } else {
  //   throw new TRPCError({
  //     code: "UNAUTHORIZED",
  //     message: "Invalid or missing token. Please login.",
  //   });
  // }
});
