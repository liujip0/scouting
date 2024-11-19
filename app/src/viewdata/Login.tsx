import { hashPassword, randomString } from "@isa2025/api/src/utils/auth.ts";
import { useState } from "react";
import { Link } from "react-router-dom";
import { trpc } from "../utils/Trpc.ts";
import { setToken } from "./ViewData.tsx";

type LoginProps = {
  setLoggedIn: (value: boolean) => void;
};
export default function Login({ setLoggedIn }: LoginProps) {
  const login = trpc.auth.login.useMutation({
    onSuccess(data) {
      if (data?.token) {
        setToken(data.token, data.expiresAt);
        setLoggedIn(true);
      }
    },
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  return (
    <div
      style={{
        border: "1px solid red",
        height: "100%",
        width: "100%",
      }}>
      <div>
        <Link to="/">Back to Landing Page</Link>
      </div>
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
      <br />
      <button
        onClick={async () => {
          const salt = randomString(32);
          const hashed = await hashPassword(password, salt);
          setHashedPassword(salt + " " + hashed);
        }}>
        Generate Hash
      </button>
      <div>{hashedPassword}</div>
    </div>
  );
}
