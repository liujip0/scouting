import { Env } from "../index.ts";

export interface publicCtx {
  user: {
    username: string;
    permLevel: "demo" | "team" | "datamanage" | "admin";
  } | null;
}
export interface publicOpts {
  request: Request;
  path: string[];
  params: URLSearchParams;
  env: Env;
  ctx: publicCtx;
}

export const createPublicContext = async (
  request: Request,
  path: string[],
  params: URLSearchParams,
  env: Env,
  router: (opts: publicOpts) => Promise<Response>
): Promise<Response> => {
  const ctx: publicCtx = {
    user: null,
  };
  return await router({
    request: request,
    path: path,
    params: params,
    env: env,
    ctx: ctx,
  });
};
