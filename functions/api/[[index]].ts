import { D1Database, PagesFunction } from "@cloudflare/workers-types";
import tRPCPlugin from "cloudflare-pages-plugin-trpc";
import { appRouter } from "./router.ts";

export interface Env {
  DB: D1Database;
  SALT_TOKEN: string;
  ADMIN_ACCOUNT_PASSWORD: string;
}

export const onRequest: PagesFunction<Env> = tRPCPlugin({
  router: appRouter,
  endpoint: "/api",
});
