import { router } from "../trpc.ts";
import { getEvent } from "./getEvent.ts";
import { getFrcEvent } from "./getFrcEvent.ts";
import { putEvents } from "./putEvents.ts";

export const eventsRouter = router({
  getEvent: getEvent,
  getFrcEvent: getFrcEvent,
  putEvents: putEvents,
});
