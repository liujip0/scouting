import { Env } from "../index.ts";
import { User } from "../utils/dbtypes.ts";

export interface publicCtx {
  user: {
    username: string;
    permLevel: User["permLevel"];
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
