import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { urls } from "../utils/constants.ts";
import { trpc } from "../utils/trpc.ts";
import Login from "./Login.tsx";

export default function ViewData() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url:
            (import.meta.env.DEV ? urls.devServer : urls.productionServer) +
            "/api",
        }),
      ],
    })
  );

  const [sessionToken, setSessionToken] = useState<string | null>(null);

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div
          style={{
            border: "1px solid blue",
            height: "100%",
            width: "100%",
          }}>
          <Link to="/">Back to Landing Page</Link>
          {sessionToken ?
            sessionToken
          : <Login setSessionToken={setSessionToken} />}
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
