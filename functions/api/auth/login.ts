import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { hashPassword } from "../../../util/auth.ts";
import { loggedPublicProcedure } from "../trpc.ts";

export const login = loggedPublicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    const result = await opts.ctx.env.DB.prepare(
      "SELECT username, hashedPassword FROM Users WHERE username = ? LIMIT 1;"
    )
      .bind(opts.input.username)
      .first();
    if (result) {
      if (
        (await hashPassword(opts.input.password, opts.ctx.env.SALT_TOKEN)) ===
        result.hashedPassword
      ) {
        const token = await hashPassword(
          (Math.random() + 1).toString(3),
          opts.ctx.env.SALT_TOKEN
        );
        const expiresAt = Date.now() + 6.048e8;
        const tokenCreationResult = await opts.ctx.env.DB.prepare(
          "INSERT INTO UserSessions (username, token, expiresAt) VALUES (?, ?, ?);"
        )
          .bind(opts.input.username, token, expiresAt)
          .run();
        if (tokenCreationResult.success) {
          return {
            token: token,
            expiresAt: expiresAt,
          };
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Token creation failed.",
          });
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid login credentials.",
        });
      }
    } else {
      if (
        opts.input.username === "admin" &&
        (await hashPassword(opts.input.password, opts.ctx.env.SALT_TOKEN)) ===
          (await hashPassword(
            opts.ctx.env.ADMIN_ACCOUNT_PASSWORD,
            opts.ctx.env.SALT_TOKEN
          ))
      ) {
        const token = await hashPassword(
          (Math.random() + 1).toString(3),
          opts.ctx.env.SALT_TOKEN
        );
        const expiresAt = Date.now() + 6.048e8;
        await opts.ctx.env.DB.prepare(
          "INSERT INTO Users (username, hashedPassword, permLevel) VALUES (?, ?, ?)"
        )
          .bind(
            opts.input.username,
            await hashPassword(
              opts.ctx.env.ADMIN_ACCOUNT_PASSWORD,
              opts.ctx.env.SALT_TOKEN
            ),
            "admin"
          )
          .run();
        const tokenCreationResult = await opts.ctx.env.DB.prepare(
          "INSERT INTO UserSessions (username, token, expiresAt) VALUES (?, ?, ?);"
        )
          .bind(opts.input.username, token, expiresAt)
          .run();
        if (tokenCreationResult.success) {
          return {
            token: token,
            expiresAt: expiresAt,
          };
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Token creation failed.",
          });
        }
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid login credentials.",
      });
    }
  });
