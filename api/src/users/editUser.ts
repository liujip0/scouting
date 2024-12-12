import { z } from "zod";
import { UserPermLevel } from "../dbtypes.ts";
import { authedLoggedProcedure } from "../trpc.ts";

export const editUser = authedLoggedProcedure
  .input(
    z.object({
      oldUsername: z.string(),
      newUsername: z.string(),
      permLevel: z.enum(UserPermLevel),
      regeneratePublicApiToken: z.boolean(),
    })
  )
  .mutation((opts) => {});
