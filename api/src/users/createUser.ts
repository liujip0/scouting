import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { UserPermLevel } from "../dbtypes.ts";
import { authedLoggedProcedure } from "../trpc.ts";
import {
  generateSaltToken,
  generateToken,
  hashPassword,
} from "../utils/auth.ts";

export const createUser = authedLoggedProcedure
  .input(
    z.object({
      username: z.string(),
      permLevel: z.enum(UserPermLevel),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    if (opts.ctx.user.permLevel !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Wrong permissions to fetch data.",
      });
    }

    const saltToken = generateSaltToken();
    const result = await opts.ctx.env.DB.prepare(
      "INSERT INTO Users (username, permLevel, hashedPassword, saltToken, publicApiToken) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(
        opts.input.username,
        opts.input.permLevel,
        await hashPassword(opts.input.password, saltToken),
        saltToken,
        await generateToken(saltToken)
      )
      .run();

    if (result.success) {
      return;
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error while creating user.",
      });
    }
  });
