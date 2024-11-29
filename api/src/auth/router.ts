import { router } from "../trpc.ts";
import { createPublicApiToken } from "./createPublicApiToken.ts";
import { login } from "./login.ts";

export const authRouter = router({
  login: login,
  createPublicApiToken: createPublicApiToken,
});
