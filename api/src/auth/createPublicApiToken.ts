import { authedLoggedProcedure } from "../trpc.ts";

export const createPublicApiToken = authedLoggedProcedure.mutation(
  (opts) => {}
);
