import { router } from "../trpc.ts";
<<<<<<< HEAD
=======
import { editUser } from "./editUser.ts";
>>>>>>> e08b502647d50d57eaada66c2d3b8aba149d130f
import { publicApiToken } from "./publicApiToken.ts";
import { users } from "./users.ts";

export const usersRouter = router({
  users: users,
<<<<<<< HEAD
=======
  editUser: editUser,
>>>>>>> e08b502647d50d57eaada66c2d3b8aba149d130f
  publicApiToken: publicApiToken,
});
