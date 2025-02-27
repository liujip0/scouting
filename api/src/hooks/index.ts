import { WebhooksOpts } from "./context.ts";
import { tba } from "./tba.ts";

export const hooksRouter = async (opts: WebhooksOpts): Promise<Response> => {
  switch (opts.path[0]) {
    case "tba": {
      return await tba(opts);
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
