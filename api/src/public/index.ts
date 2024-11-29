import { User } from "../dbtypes.ts";
import { publicOpts } from "./context.ts";
import { data } from "./data.ts";

export const publicRouter = async (opts: publicOpts): Promise<Response> => {
  switch (opts.path[0]) {
    case "data": {
      return await authedPublicEndpoint(opts, data);
    }
    default: {
      return new Response(
        JSON.stringify({
          error: "404 Not Found",
          errorMessage: `The requested endpoint ${new URL(opts.request.url).pathname} does not exist `,
        }),
        {
          status: 404,
          statusText: "Not Found",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
};

export const authedPublicEndpoint = async (
  opts: publicOpts,
  endpoint: (opts: publicOpts) => Promise<Response>
): Promise<Response> => {
  let token;
  if (opts.request.headers.has("Authorization")) {
    token = opts.request.headers.get("Authorization")?.split(" ")[1];
  } else if (opts.params.has("auth")) {
    token = opts.params.get("auth");
  }
  if (token) {
    const authResults = await opts.env.DB.prepare(
      "SELECT username, permLevel FROM Users WHERE publicApiToken = ? LIMIT 1"
    )
      .bind(token)
      .run<{
        username: string;
        permLevel: User["permLevel"];
      }>();
    if (!authResults.success) {
      return new Response(
        JSON.stringify({
          error: "401 Unauthorized",
          errorMessage: "Invalid access token.",
        }),
        {
          status: 401,
          statusText: "Unauthorized",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return await endpoint({
      request: opts.request,
      path: opts.path,
      params: opts.params,
      env: opts.env,
      ctx: {
        ...opts.ctx,
        user: {
          username: authResults.results[0].username,
          permLevel: authResults.results[0].permLevel,
        },
      },
    });
  }
  return new Response(
    JSON.stringify({
      error: "401 Unauthorized",
      errorMessage: "Missing access token.",
    }),
    {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
