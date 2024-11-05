import { useState } from "react";
import { trpc } from "../utils/trpc.ts";

type LoginProps = {
  setSessionToken: (value: string) => void;
};
export default function Login({ setSessionToken }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hello, setHello] = useState("");

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
        onClick={() => {
          const response = trpc.hello.useQuery(username);
          if (response.data) {
            setHello(response.data);
          }
        }}>
        Test Hello API
      </button>
      <br />
      <div>{hello}</div>
    </div>
  );
}
