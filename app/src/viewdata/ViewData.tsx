import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { urls } from "../utils/constants.ts";
import { trpc } from "../utils/trpc.ts";
import DataViewerLayout from "./DataViewerLayout.tsx";
import Login from "./Login.tsx";
import SelectEvent from "./SelectEvent.tsx";

let token: string;
if (localStorage.getItem("token")) {
  token = localStorage.getItem("token")!;
}
// eslint-disable-next-line react-refresh/only-export-components
export function setToken(newToken: string, expiresAt: number) {
  localStorage.setItem("token", newToken);
  localStorage.setItem("tokenExpiresAt", expiresAt.toString());
  token = newToken;
}

export default function ViewData() {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("token") !== null &&
      localStorage.getItem("tokenExpiresAt") !== null &&
      Date.now() < parseInt(localStorage.getItem("tokenExpiresAt")!)
  );
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
              return (
                <SelectEvent
                  eventKey={eventKey}
                  setEventKey={setEventKey}
                />
              );
            } else {
              return <DataViewerLayout />;
            }
          })()}
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
