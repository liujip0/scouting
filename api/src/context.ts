import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async ({
  req,
  resHeaders,
  info,
}: FetchCreateContextFnOptions) => {
  return { req, resHeaders, info };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
