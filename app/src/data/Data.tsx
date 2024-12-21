import { User } from "@isa2025/api/src/utils/dbtypes.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { useState } from "react";
import { trpc } from "../utils/Trpc.tsx";
import DataViewerLayout from "./DataViewerLayout.tsx";
import Login from "./Login.tsx";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_SERVER_URL + "/api",
      headers() {
        return {
          Authorization: "Bearer " + localStorage.getItem("token"),
        };
      },
    }),
  ],
});

export default function Data() {
  const [token, setTokenState] = useState<string>(() => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("tokenExpiresAt") !== null &&
      localStorage.getItem("permLevel") !== null
    ) {
      if (Date.now() < parseInt(localStorage.getItem("tokenExpiresAt")!)) {
        return localStorage.getItem("token")!;
      }
    }
    return "";
  });
  const [permLevel, setPermLevelState] = useState<User["permLevel"]>(
    (localStorage.getItem("permLevel") || "none") as User["permLevel"]
  );
  const setToken = (
    newToken: string,
    expiresAt: number,
    permLevel: User["permLevel"]
  ) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("tokenExpiresAt", expiresAt.toString());
    setTokenState(newToken);
    localStorage.setItem("permLevel", permLevel);
    setPermLevelState(permLevel);
  };

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {token === "" ?
          <Login setToken={setToken} />
        : <DataViewerLayout
            token={token}
            setToken={setToken}
            permLevel={permLevel}
          />
        }
      </QueryClientProvider>
    </trpc.Provider>
  );
}
