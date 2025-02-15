import {
  HumanPlayerEntryColumns,
  TeamMatchEntryColumns,
} from "../utils/dbtypes.ts";
import { publicOpts } from "./context.ts";
import { getHumanData } from "./humans.ts";
import { getRobotData } from "./robots.ts";

export const all = async (opts: publicOpts): Promise<Response> => {
  if (
    opts.ctx.user === null ||
    (opts.ctx.user?.permLevel !== "team" &&
      opts.ctx.user?.permLevel !== "datamanage" &&
      opts.ctx.user?.permLevel !== "admin")
  ) {
    return new Response(
      JSON.stringify({
        error: "403 Forbidden",
        errorMessage: "Wrong permissions to fetch data.",
      }),
      {
        status: 403,
        statusText: "Forbidden",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const renameColumns: Record<string, string> = {};
  opts.params.getAll("rename").forEach((item) => {
    const column = item.split(".");
    renameColumns[column[0]] = column[1];
  });
  let robotColumns: string[] = [...TeamMatchEntryColumns];
  let humanColumns: string[] = [...HumanPlayerEntryColumns];

  if (
    opts.params.has("include") &&
    opts.params.get("include")?.length ===
      TeamMatchEntryColumns.length + HumanPlayerEntryColumns.length
  ) {
    const newRobotColumns: string[] = [];
    const newHumanColumns: string[] = [];
    const include = opts.params.get("include")!;
    for (let i = 0; i < TeamMatchEntryColumns.length; i++) {
      if (include[i] === "1") {
        newRobotColumns.push(
          robotColumns[i] +
            (renameColumns[robotColumns[i]] !== undefined ?
              ` AS ${renameColumns[robotColumns[i]]}`
            : "")
        );
      }
    }
    for (
      let i = TeamMatchEntryColumns.length;
      i < TeamMatchEntryColumns.length + HumanPlayerEntryColumns.length;
      i++
    ) {
      if (include[i - TeamMatchEntryColumns.length] === "1") {
        newHumanColumns.push(
          humanColumns[i - TeamMatchEntryColumns.length] +
            ((
              renameColumns[humanColumns[i - TeamMatchEntryColumns.length]] !==
              undefined
            ) ?
              ` AS ${renameColumns[humanColumns[i - TeamMatchEntryColumns.length]]}`
            : "")
        );
      }
    }
    robotColumns = newRobotColumns;
    humanColumns = newHumanColumns;
  }

  const robotResults = await getRobotData(
    robotColumns,
    opts.params.getAll("event"),
    opts.params.getAll("team"),
    opts.env.DB
  );
  const humanResults = await getHumanData(
    humanColumns,
    opts.params.getAll("event"),
    opts.params.getAll("team"),
    opts.env.DB
  );

  if (robotResults.success && humanResults.success) {
    switch (opts.path[1]) {
      case "json": {
        return new Response(
          JSON.stringify([...robotResults.results, ...humanResults.results]),
          {
            status: 200,
            statusText: "OK",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      case "csv": {
        //TODO: make csv response
        return new Response("CSV");
      }
      case "xlsx": {
        //TODO: make xlsx response
        return new Response("XLSX");
      }
      default: {
        return new Response(null, {
          status: 404,
          statusText: "Not Found",
        });
      }
    }
  } else {
    return new Response(
      JSON.stringify({
        error: "500 Internal Server Error",
        errorMessage: "Error while fetching data from server",
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
