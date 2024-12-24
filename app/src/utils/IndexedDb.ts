let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;
const dbname = "isa2025-idb";

export enum Stores {
  Events = "Events",
  Matches = "Matches",
  TeamMatchEntry = "TeamMatchEntry",
}

export const initIDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbname, version);

    request.onupgradeneeded = () => {
      db = request.result;
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
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(
  storeName: Stores,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbname, version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown IDB error.");
      }
    };
  });
};

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbname);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};
