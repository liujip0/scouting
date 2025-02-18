import { router } from "../trpc.ts";
import { exportData } from "./exportData.ts";
import { importData } from "./importData.ts";

export const maintenanceRouter = router({
  exportData: exportData,
  importData: importData,
});
