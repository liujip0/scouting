import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { loggedPublicProcedure } from "../trpc.ts";

export const logout = loggedPublicProcedure
  .input(z.string().optional())
  .mutation(async (opts) => {
    const result = await opts.ctx.env.DB.prepare(
      "DELETE FROM UserSessions WHERE token = ? LIMIT 1"
    )
      .bind(
        opts.input ?? opts.ctx.req.headers.get("Authorization")?.split(" ")[1]
      )
      .run();
    if (!result.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error while invalidating token.",
      });
    }
  });
