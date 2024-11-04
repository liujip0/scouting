import { D1Database } from "@cloudflare/workers-types";

export interface Env {
  DB: D1Database;
  SALT_TOKEN: string;
  ADMIN_ACCOUNT_PASSWORD: string;
}

// export const onRequest: PagesFunction<Env> = (context: Env) => {
//     return fetchRequestHandler({
//       endpoint: "/api",
//       req: request,
//       createContext: (opts: FetchCreateContextFnOptions) =>
//         createContext({ ...opts, env }),
//       router: appRouter,
//     });
//   }
