import { TRPCError } from "@trpc/server";
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

  const result = await opts.ctx.env.DB.prepare(
    "SELECT publicApiToken FROM Users WHERE username = ? LIMIT 1"
  )
    .bind(opts.ctx.user.username)
    .first<{ publicApiToken: string }>();

  if (result) {
    return result.publicApiToken;
  } else {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error while fetching publicApiToken.",
    });
  }
});
