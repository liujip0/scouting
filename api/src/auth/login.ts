import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { loggedPublicProcedure } from "../trpc.ts";
import { hashPassword, randomString } from "../utils/auth.ts";

export const login = loggedPublicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    const result = await opts.ctx.env.DB.prepare(
      "SELECT username, hashedPassword, saltToken FROM Users WHERE username = ? LIMIT 1;"
    )
      .bind(opts.input.username)
      .first<{ username: string; hashedPassword: string; saltToken: string }>();
    if (result) {
      if (
        (await hashPassword(opts.input.password, result.saltToken)) ===
        result.hashedPassword
      ) {
        const token = await hashPassword(
          (Math.random() + 1).toString(3),
          result.saltToken
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
      if (opts.input.username === "admin") {
        const salt = randomString(32);
        if (
          (await hashPassword(opts.input.password, salt)) ===
          (await hashPassword(opts.ctx.env.ADMIN_ACCOUNT_PASSWORD, salt))
        ) {
          const token = await hashPassword(
            (Math.random() + 1).toString(3),
            salt
          );
          const expiresAt = Date.now() + 6.048e8;
          const adminCreationResult = await opts.ctx.env.DB.prepare(
            "INSERT INTO Users (username, hashedPassword, permLevel, saltToken) VALUES (?, ?, ?, ?)"
          )
            .bind(
              opts.input.username,
              await hashPassword(opts.ctx.env.ADMIN_ACCOUNT_PASSWORD, salt),
              "admin",
              salt
            )
            .run();
          const tokenCreationResult = await opts.ctx.env.DB.prepare(
            "INSERT INTO UserSessions (username, token, expiresAt) VALUES (?, ?, ?);"
          )
            .bind(opts.input.username, token, expiresAt)
            .run();
          if (tokenCreationResult.success && adminCreationResult.success) {
            return {
              token: token,
              expiresAt: expiresAt,
            };
          } else {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Admin token creation failed.",
            });
          }
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid login credentials.",
        });
      }
    }
  });
