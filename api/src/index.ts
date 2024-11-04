import { D1Database } from '@cloudflare/workers-types';
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler
} from '@trpc/server/adapters/fetch';
import { createContext } from './context.ts';
import { appRouter } from './router.ts';

export interface Env {
  DB: D1Database;
  SALT_TOKEN: string;
  ADMIN_ACCOUNT_PASSWORD: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      const response = new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        }
      });
      return response;
    }

    return fetchRequestHandler({
      endpoint: '/api',
      req: request,
      router: appRouter,
      createContext: (options: FetchCreateContextFnOptions) =>
        createContext({ ...options, env })
    });
  }
};
