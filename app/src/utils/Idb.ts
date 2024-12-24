import { openDB } from "idb";

let db;
let version = 1;
const dbname = "isa2025-idb";

export enum Stores {
  Events = "Events",
  Matches = "Matches",
  TeamMatchEntry = "TeamMatchEntry",
}

export const initDB = async () => {
  db = openDB(dbname, version, {
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
