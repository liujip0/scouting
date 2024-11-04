import { useState } from "react";
import Login from "./Login.tsx";

export default function ViewData() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  return (
    <div
      style={{
        border: "1px solid blue",
        height: "100%",
        width: "100%",
      }}>
      <a href="/">Back to Landing Page</a>
      {sessionToken ?
        sessionToken
      : <Login setSessionToken={setSessionToken} />}
    </div>
  );
}
