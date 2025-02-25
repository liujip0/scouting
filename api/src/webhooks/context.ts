import { Env } from "../index.ts";

export const createWebhooksContext = async (
  request: Request,
  path: string[],
  env: Env,
  router: (opts) => Promise<Response>
) => {};
