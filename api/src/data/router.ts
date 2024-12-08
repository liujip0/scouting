import { router } from "../trpc.ts";
import { data } from "./data.ts";

export const dataRouter = router({
  data: data,
});
