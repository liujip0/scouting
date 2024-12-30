import { router } from "../trpc.ts";
import { getEvent } from "./getEvent.ts";
import { putEvents } from "./putEvents.ts";

export const eventsRouter = router({
  getEvent: getEvent,
  putEvents: putEvents,
});
