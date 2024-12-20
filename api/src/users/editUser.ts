import { D1PreparedStatement } from "@cloudflare/workers-types";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { UserPermLevel } from "../dbtypes.ts";
import { authedLoggedProcedure } from "../trpc.ts";
import { randomString } from "../utils/auth.ts";

export const editUser = authedLoggedProcedure
  .input(
    z.object({
      oldUsername: z.string(),
      newUsername: z.string().optional(),
      permLevel: z.enum(UserPermLevel).optional(),
      regeneratePublicApiToken: z.boolean().optional(),
    })
  )
  .mutation(async (opts) => {
    if (opts.ctx.user.permLevel !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Wrong permissions to fetch data.",
      });
    }

    if (
      opts.input.newUsername === undefined &&
      opts.input.permLevel === undefined &&
      !opts.input.regeneratePublicApiToken
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No changes requested.",
      });
    }

    let query = "UPDATE Users SET ";
    const changes = [];
    if (opts.input.newUsername) {
      changes.push("username = ?");
    }
    if (opts.input.permLevel) {
      changes.push("permLevel = ?");
    }
    if (opts.input.regeneratePublicApiToken) {
      changes.push("publicApiToken = ?");
    }
    query += " WHERE username = ? LIMIT 1";

    let boundQuery: D1PreparedStatement;
    if (opts.input.regeneratePublicApiToken) {
      boundQuery = opts.ctx.env.DB.prepare(query).bind(
        opts.input.newUsername,
        opts.input.permLevel,
        randomString(32),
        opts.input.oldUsername
      );
    } else {
      boundQuery = opts.ctx.env.DB.prepare(query).bind(
        opts.input.newUsername,
        opts.input.permLevel,
        opts.input.oldUsername
      );
    }
    const result = await boundQuery.run();
    if (result.success) {
      return;
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error while updating user.",
      });
    }
  });
