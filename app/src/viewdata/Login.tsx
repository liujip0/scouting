import { useState } from "react";
import { trpc } from "../utils/trpc.ts";

type LoginProps = {
  setSessionToken: (value: string) => void;
};
export default function Login({ setSessionToken }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hello, setHello] = useState("");

  const helloQuery = trpc.hello.useQuery(username, {
    enabled: false,
  });
  const utils = trpc.useUtils();

  return (
    <div
      style={{
        border: "1px solid red",
        height: "100%",
        width: "100%",
      }}>
      <input
        type="text"
        value={username}
        onInput={(event) => {
          setUsername(event.currentTarget.value);
        }}
      />
      <br />
      <input
        type="password"
        value={password}
        onInput={(event) => {
          setPassword(event.currentTarget.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          setSessionToken("kar;ghliuwh");
        }}>
        Submit
      </button>
      <br />
      <button
        onClick={async () => {
          const response = await utils.hello.fetch(username);
          if (response) {
            setHello(response);
          }
        }}>
        Test Hello API
      </button>
      <br />
      <div>{hello ?? "No data yet"}</div>
    </div>
  );
}
