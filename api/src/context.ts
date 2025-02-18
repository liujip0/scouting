import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Env } from "./index.ts";

export const createContext = async ({
  req,
  env,
  resHeaders,
}: FetchCreateContextFnOptions & { env: Env }) => {
  const responseHeaders = resHeaders;
  responseHeaders.append("Access-Control-Allow-Origin", "*");
  responseHeaders.append("Access-Control-Allow-Headers", "*");
  return {
    req,
    env,
    resHeaders: responseHeaders,
  };
  s;
};
export type Context = Awaited<ReturnType<typeof createContext>>;
