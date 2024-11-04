import { inferAsyncReturnType } from "@trpc/server";
import { FetchCreateContextWithCloudflareEnvFnOptions } from "cloudflare-pages-plugin-trpc";
import { Env } from "./[[index]].ts";

export const createContext = async ({
  req,
  env,
}: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  return {
    req,
    env,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;
