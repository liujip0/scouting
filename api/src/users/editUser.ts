import { z } from "zod";
import { authedLoggedProcedure } from "../trpc.ts";

export const editUser = authedLoggedProcedure.input(
  z.object({
    username: z.string(),
  })
);
