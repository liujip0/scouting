import { Env } from "../index.ts";
import { data } from "./data.ts";

export const publicRouter = async (
  request: Request,
  path: string[],
  params: URLSearchParams,
  env: Env
): Promise<Response> => {
  switch (path[0]) {
    case "data": {
      return await data(request, path, params, env);
    }
    default: {
      return new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
  }
};
