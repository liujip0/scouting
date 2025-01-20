import { router } from "../trpc.ts";
import { data } from "./data.ts";
import { putEntries } from "./putEntries.ts";

export const dataRouter = router({
  data: data,
  putEntries: putEntries,
});
