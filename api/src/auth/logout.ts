import { TRPCError } from "@trpc/server";
import { authedLoggedProcedure } from "../trpc.ts";

export const logout = authedLoggedProcedure.mutation(async (opts) => {
  const result = await opts.ctx.env.DB.prepare(
    "DELETE FROM UserSessions WHERE token = ? LIMIT 1"
  )
    .bind(opts.ctx.req.headers.get("Authorization"))
    .run();
  if (!result.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error while invalidating token.",
    });
  }
});
