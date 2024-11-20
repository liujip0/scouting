import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GridBorder } from "../common/Components.tsx";
import { trpc } from "../utils/Trpc.tsx";
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <GridBorder>
      <Box
        sx={{
          width: 1,
          height: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Link to="/">Back to Landing Page</Link>
        <Avatar
          alt="ISA Logo"
          src="/logo.svg"
          sx={{
            width: "min(30vw, 30vh)",
            height: "min(30vw, 30vh)",
            m: 2,
          }}
        />
        <TextField
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value);
          }}
        />
        <TextField
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}>
                    {showPassword ?
                      <VisibilityOff />
                    : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <button
          onClick={() => {
            login.mutate({ username, password });
          }}>
          Submit
        </button>
      </Box>
    </GridBorder>
  );
}
