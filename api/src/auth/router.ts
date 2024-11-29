import { router } from "../trpc.ts";
import { login } from "./login.ts";
import { logout } from "./logout.ts";

export const authRouter = router({
  login: login,
  logout: logout,
});
