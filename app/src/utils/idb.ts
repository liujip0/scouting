import {
  DBEvent,
  HumanPlayerEntry,
  Match,
  TeamMatchEntry,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { openDB } from "idb";

const version = 1;
const dbname = "isa2025-idb";

export enum Stores {
  Events = "Events",
  Matches = "Matches",
  TeamMatchEntry = "TeamMatchEntry",
  HumanPlayerEntry = "HumanPlayerEntry",
}

export const initDB = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const dbReq = indexedDB.open(dbname, version);
    dbReq.onupgradeneeded = () => {
      const db = dbReq.result;
      if (!db.objectStoreNames.contains(Stores.Events)) {
        db.createObjectStore(Stores.Events, {
          keyPath: "eventKey",
        });
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
            "teamNumber",
            "deviceTeamNumber",
            "deviceId",
          ],
        });
      }
      if (!db.objectStoreNames.contains(Stores.HumanPlayerEntry)) {
        db.createObjectStore(Stores.HumanPlayerEntry, {
          keyPath: [
            "eventKey",
            "matchKey",
            "teamNumber",
            "deviceTeamNumber",
            "deviceId",
          ],
        });
      }
    };
    dbReq.onsuccess = () => {
      resolve(true);
    };
    dbReq.onerror = () => {
      reject();
    };
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

export const putEntry = async (
  match:
    | (TeamMatchEntry & { exported: boolean })
    | (HumanPlayerEntry & { exported: boolean })
) => {
  const db = await openDB(dbname, version);
  if (match.robotNumber < 4) {
    await db.put(Stores.TeamMatchEntry, match);
  } else {
    await db.put(Stores.HumanPlayerEntry, match);
  }
};

export const deleteEntry = async (match: HumanPlayerEntry | TeamMatchEntry) => {
  const db = await openDB(dbname, version);
  if (match.robotNumber < 4) {
    db.delete(Stores.TeamMatchEntry, [
      match.eventKey,
      match.matchKey,
      match.alliance,
      match.robotNumber,
      match.deviceTeamNumber,
      match.deviceId,
    ]);
  } else {
    db.delete(Stores.HumanPlayerEntry, [
      match.eventKey,
      match.matchKey,
      match.alliance,
      match.robotNumber,
      match.deviceTeamNumber,
      match.deviceId,
    ]);
  }
};
