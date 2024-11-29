import { z } from "zod";
import { authedLoggedProcedure } from "./trpc.ts";

export const data = authedLoggedProcedure
  .input(
    z.object({
      events: z.array(z.string()).nonempty().optional(),
      teams: z.array(z.number().positive()).nonempty().optional(),
    })
  )
  .query((opts) => {});
