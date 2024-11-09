import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { urls } from "../utils/constants.ts";
import { trpc } from "../utils/trpc.ts";
import DataViewerLayout from "./DataViewerLayout.tsx";
import Login from "./Login.tsx";
import SelectEvent from "./SelectEvent.tsx";

let token: string;
export function setToken(newToken: string) {
  token = newToken;
}

export default function ViewData() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [eventKey, setEventKey] = useState<string | null>(null);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url:
            (import.meta.env.DEV ? urls.devServer : urls.productionServer) +
            "/api",
          headers() {
            return {
              Authorization: "Bearer " + token,
            };
          },
        }),
      ],
    })
  );

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
          {(() => {
            if (!loggedIn) {
              return <Login setLoggedIn={setLoggedIn} />;
            } else if (!eventKey) {
              return <SelectEvent setEventKey={setEventKey} />;
            } else {
              return <DataViewerLayout />;
            }
          })()}
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
