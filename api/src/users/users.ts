import { TRPCError } from "@trpc/server";
import { User } from "../dbtypes.ts";
import { authedLoggedProcedure } from "../trpc.ts";

export const users = authedLoggedProcedure.query(async (opts) => {
  if (opts.ctx.user.permLevel !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Wrong permissions to fetch user data.",
    });
  }

  const results = await opts.ctx.env.DB.prepare(
    "SELECT username, publicApiToken, permLevel FROM Users"
  ).all<User>();

  if (results.success) {
    return results.results;
  } else {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error while fetching users.",
    });
  }
});
