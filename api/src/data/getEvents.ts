import { TRPCError } from "@trpc/server";
import { authedLoggedProcedure } from "../trpc.ts";

export const getEvents = authedLoggedProcedure.query(async (opts) => {
  const result = await opts.ctx.env.DB.prepare(
    "SELECT eventKey, eventName FROM Events;"
  ).all<{ eventKey: string; eventName: string }>();
  if (result.success) {
    return result.results;
  } else {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Get events failed.",
    });
  }
});
