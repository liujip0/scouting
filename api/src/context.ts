import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Env } from './index.ts';

export const createContext = async ({
  req,
  env,
  resHeaders
}: FetchCreateContextFnOptions & { env: Env }) => {
  return {
    req,
    env,
    resHeaders
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;
