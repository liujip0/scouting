export const publicRouter = (
  request: Request,
  path: string[],
  params: URLSearchParams
): Response => {
  switch (path[0]) {
    case "data": {
      return new Response("Success!");
    }
    default: {
      return new Response("", {
        status: 404,
        statusText: "Not found",
      });
    }
  }
};
