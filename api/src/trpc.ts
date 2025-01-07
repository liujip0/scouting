import { initTRPC, TRPCError } from "@trpc/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Context } from "./context.ts";
import { User } from "./utils/dbtypes.ts";

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

  let tokenPayload: JwtPayload & {
    user: {
      username: string;
      permLevel: User["permLevel"];
    };
  };
  try {
    tokenPayload = jwt.verify(
      token,
      opts.ctx.env.JWT_PRIVATE_KEY
    ) as JwtPayload & {
      user: {
        username: string;
        permLevel: User["permLevel"];
      };
    };
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Token could not be verified.",
    });
  }

  const user = await opts.ctx.env.DB.prepare(
    "SELECT username, permLevel FROM Users WHERE username = ? LIMIT 1"
  )
    .bind(tokenPayload.user.username)
    .run<User>();
  if (!user.success || user.results[0] === undefined) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User account not found.",
    });
  }
  if (user.results[0].permLevel !== tokenPayload.user.permLevel) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Token permLevel does not match database.",
    });
  }

  const result = await opts.next({
    ctx: {
      user: tokenPayload.user,
    },
  });
  return result;
});
