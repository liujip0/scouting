import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Env } from "./index.ts";

export const createContext = async ({
  req,
  resHeaders,
  env,
}: FetchCreateContextFnOptions & { env: Env }) => {
  return { req, resHeaders, env };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
