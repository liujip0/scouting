import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trpc } from "../utils/trpc.ts";

type LoginProps = {
  setSessionToken: (value: string) => void;
};
export default function Login({ setSessionToken }: LoginProps) {
  const login = trpc.auth.login.useMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (login.isSuccess) {
      setSessionToken(login.data!.token);
    }
  }, [login]);

  return (
    <div
      style={{
        border: "1px solid red",
        height: "100%",
        width: "100%",
      }}>
      <Link to="/">Back to Landing Page</Link>
      <br />
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
          login.mutate({ username, password });
        }}>
        Submit
      </button>
      <div>
        {login.isSuccess && "Login Successful"}
        {login.isError && login.error.message}
      </div>
    </div>
  );
}
