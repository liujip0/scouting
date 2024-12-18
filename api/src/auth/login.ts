import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { User } from "../dbtypes.ts";
import { loggedPublicProcedure } from "../trpc.ts";
import {
  generateSaltToken,
  generateToken,
  hashPassword,
} from "../utils/auth.ts";

export const login = loggedPublicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    const result = await opts.ctx.env.DB.prepare(
      "SELECT username, permLevel, hashedPassword, saltToken FROM Users WHERE username = ? LIMIT 1;"
    )
      .bind(opts.input.username)
      .first<User>();
    if (result) {
      if (
        (await hashPassword(opts.input.password, result.saltToken)) ===
        result.hashedPassword
      ) {
        const token = await generateToken(result.saltToken);
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
            permLevel: result.permLevel,
          };
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Token creation failed.",
          });
        }
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid login credentials.",
        });
      }
    } else {
      if (opts.input.username === opts.ctx.env.ADMIN_ACCOUNT_USERNAME) {
        const saltToken = generateSaltToken();
        if (
          (await hashPassword(opts.input.password, saltToken)) ===
          (await hashPassword(opts.ctx.env.ADMIN_ACCOUNT_PASSWORD, saltToken))
        ) {
          const token = await generateToken(saltToken);
          const expiresAt = Date.now() + 6.048e8;
          const adminCreationResult = await opts.ctx.env.DB.prepare(
            "INSERT INTO Users (username, permLevel, hashedPassword, saltToken, publicApiToken) VALUES (?, ?, ?, ?, ?)"
          )
            .bind(
              opts.input.username,
              "admin",
              await hashPassword(
                opts.ctx.env.ADMIN_ACCOUNT_PASSWORD,
                saltToken
              ),
              saltToken,
              await generateToken(saltToken)
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
              permLevel: "admin",
            };
          } else {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Admin token creation failed.",
            });
          }
        }
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid login credentials.",
        });
      }
    }
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid login credentials.",
    });
  });
