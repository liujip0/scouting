import { WebhooksOpts } from "./context.ts";

export const webhooksRouter = async (opts: WebhooksOpts): Promise<Response> => {
  switch (opts.path[0]) {
    case "tba": {
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
