import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "./context.ts";
import { appRouter } from "./router.ts";

export default {
  async fetch(request: Request): Promise<Response> {
    return fetchRequestHandler({
      endpoint: "/trpc",
      req: request,
      router: appRouter,
      createContext: createContext,
    });
  },
};
