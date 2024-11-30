import { TeamMatchEntry, TeamMatchEntryColumns } from "../dbtypes.ts";
import { publicOpts } from "./context.ts";

export const data = async (opts: publicOpts): Promise<Response> => {
  const renameColumns: Record<string, string> = {};
  opts.params.getAll("rename").forEach((item) => {
    const column = item.split(".");
    renameColumns[column[0]] = column[1];
  });
  let columns: string[] = [...TeamMatchEntryColumns];

  if (
    opts.params.has("include") &&
    opts.params.get("include")?.length === columns.length
  ) {
    const newColumns: string[] = [];
    const include = opts.params.get("include")!;
    for (let i = 0; i < columns.length; i++) {
      if (include[i] === "1") {
        newColumns.push(
          columns[i] +
            (renameColumns[columns[i]] !== undefined ?
              ` AS ${renameColumns[columns[i]]}`
            : "")
        );
      }
    }
    columns = newColumns;
  }

  let query = `SELECT ${columns.join(", ")}
              FROM TeamMatchEntry
              WHERE (`;
  const bindParams: string[] = [];

  if (opts.params.has("event")) {
    query += opts.params
      .getAll("event")
      .map((value) => {
        bindParams.push(value);
        return "eventKey = ?";
      })
      .join(" OR ");
  } else {
    query += "1";
  }
  query += ") AND (";

  if (opts.params.has("team")) {
    query += opts.params
      .getAll("team")
      .map((value) => {
        bindParams.push(value);
        return "teamNumber = ?";
      })
      .join(" OR ");
  } else {
    query += "1";
  }
  query += ")";

  const results = await opts.env.DB.prepare(query)
    .bind(...bindParams)
    .all<TeamMatchEntry>();

  if (results.success) {
    switch (opts.path[1]) {
      case "json": {
        return new Response(JSON.stringify(results.results), {
          status: 200,
          statusText: "OK",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      case "csv": {
        return new Response("CSV");
      }
      default: {
        return new Response(null, {
          status: 404,
          statusText: "Not Found",
        });
      }
    }
  } else {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
