import { Env } from "../index.ts";

export interface WebhooksOpts {
  request: Request;
  path: string[];
  env: Env;
}

export const createWebhooksContext = async (
  request: Request,
  path: string[],
  env: Env,
  router: (opts: WebhooksOpts) => Promise<Response>
) => {
  const response = await router({
    request: request,
    path: path,
    env: env,
  });
  response.headers.append("Access-Control-Allow-Origin", "*");
  response.headers.append("Access-Control-Allow-Headers", "*");
  return response;
};
