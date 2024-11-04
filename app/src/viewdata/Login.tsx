import { useState } from "react";

type LoginProps = {
  setSessionToken: (value: string) => void;
};
export default function Login({ setSessionToken }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <input
        type="password"
        value={password}
        onInput={(event) => {
          setPassword(event.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          setSessionToken("kar;ghliuwh");
        }}>
        Submit
      </button>
    </div>
  );
}
