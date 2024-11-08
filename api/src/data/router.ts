import { router } from "../trpc.ts";
import { getEvents } from "./getEvents.ts";

export const dataRouter = router({
  getEvents: getEvents,
});
