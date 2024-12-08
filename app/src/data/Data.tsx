import { User } from "@isa2025/api/src/dbtypes.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { trpc } from "../utils/Trpc.tsx";
import DataViewerLayout from "./DataViewerLayout.tsx";
import Login from "./Login.tsx";

export let token: string;
if (localStorage.getItem("token") !== "") {
  token = localStorage.getItem("token")!;
}
// eslint-disable-next-line react-refresh/only-export-components
export function setToken(newToken: string, expiresAt: number) {
  localStorage.setItem("token", newToken);
  localStorage.setItem("tokenExpiresAt", expiresAt.toString());
  token = newToken;
}

export default function Data() {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("token") !== null &&
      localStorage.getItem("tokenExpiresAt") !== null &&
      Date.now() < parseInt(localStorage.getItem("tokenExpiresAt")!)
  );
  const [permLevel, setPermLevelState] = useState<User["permLevel"]>(
    (localStorage.getItem("permLevel") as User["permLevel"]) ?? "none"
  );
  const setPermLevel = (value: User["permLevel"]) => {
    setPermLevelState(value);
    localStorage.setItem("permLevel", value);
  };

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.SERVER_URL as string,
          // (import.meta.env.DEV ? urls.devServer : urls.productionServer) +
          // "/api",
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
        {!loggedIn ?
          <Login
            setLoggedIn={setLoggedIn}
            setPermLevel={setPermLevel}
          />
        : <DataViewerLayout
            setLoggedIn={setLoggedIn}
            permLevel={permLevel}
            setPermLevel={setPermLevel}
          />
        }
      </QueryClientProvider>
    </trpc.Provider>
  );
}
