import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { authedLoggedProcedure } from "../trpc.ts";

export const publicApiToken = authedLoggedProcedure.query(async (opts) => {
  if (
    opts.ctx.user.permLevel !== "team" &&
    opts.ctx.user.permLevel !== "datamanage" &&
    opts.ctx.user.permLevel !== "admin"
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Wrong permissions to fetch data.",
    });
  }

  return jwt.sign(
    {
      user: {
        username: opts.ctx.user.username,
        permLevel: opts.ctx.user.permLevel,
      },
    },
    opts.ctx.env.JWT_PRIVATE_KEY
  );
});
