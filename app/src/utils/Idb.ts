import { DBEvent, Match } from "@isa2025/api/src/utils/dbtypes.ts";
import { openDB } from "idb";

let version = 1;
const dbname = "isa2025-idb";

export enum Stores {
  Events = "Events",
  Matches = "Matches",
  TeamMatchEntry = "TeamMatchEntry",
}

export const initDB = async () => {
  await openDB(dbname, version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(Stores.Events)) {
        db.createObjectStore(Stores.Events, { keyPath: "eventKey" });
      }
      if (!db.objectStoreNames.contains(Stores.Matches)) {
        db.createObjectStore(Stores.Matches, {
          keyPath: ["eventKey", "matchKey"],
        });
      }
      if (!db.objectStoreNames.contains(Stores.TeamMatchEntry)) {
        db.createObjectStore(Stores.TeamMatchEntry, {
          keyPath: [
            "eventKey",
            "matchKey",
            "alliance",
            "robotNumber",
            "deviceTeamNumber",
            "deviceId",
          ],
        });
      }
    },
  });
};

export const getFromDBStore = async (store: Stores) => {
  const db = await openDB(dbname, version);
  const res = await db.getAll(store);
  return res;
};

export const putDBEvent = async (event: DBEvent) => {
  const db = await openDB(dbname, version);
  await db.put(Stores.Events, event);
};

export const putDBMatches = async (matches: Match[]) => {
  const db = await openDB(dbname, version);
  const tx = db.transaction(Stores.Matches, "readwrite");
  for (let i = 0; i < matches.length; i++) {
    await tx.objectStore(Stores.Matches).put(matches[i]);
  }
  await tx.done;
};
