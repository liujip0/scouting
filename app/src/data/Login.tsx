import { User } from "@isa2025/api/src/dbtypes.ts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GridBorder,
  borderMarginPx,
  borderWidthPx,
} from "../components/GridBorder.tsx";
import { TextFieldDoubleLabel } from "../TextFieldLabel.tsx";
import { trpc } from "../utils/Trpc.tsx";
import { setToken } from "./Data.tsx";

type LoginProps = {
  setLoggedIn: (value: boolean) => void;
  setPermLevel: (value: User["permLevel"]) => void;
};
export default function Login({ setLoggedIn, setPermLevel }: LoginProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [errorText, setErrorText] = useState("");

  const login = trpc.auth.login.useMutation({
    onSuccess(data) {
      if (data?.token) {
        setToken(data.token, data.expiresAt);
        setPermLevel(data.permLevel as User["permLevel"]);
        setLoggedIn(true);
      }
    },
    onError(error) {
      setErrorText(error.message);
    },
  });

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
        <Avatar
          alt="ISA Logo"
          src="/logo.svg"
          sx={{
            width: "min(25vw, 25vh)",
            height: "min(25vw, 25vh)",
            m: 1,
            borderColor: "primary.main",
            borderStyle: "solid",
            borderWidth: "5px",
          }}
        />
        <Typography
          variant="h3"
          fontSize="2rem"
          sx={{
            mb: 2,
          }}>
          Login
        </Typography>
        <TextFieldDoubleLabel label="Username:">
          <TextField
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
            placeholder="Enter Username"
            error={errorText !== ""}
            color="primary"
            size="small"
            sx={{
              width: 1,
              borderColor: "primary.main",
            }}
          />
        </TextFieldDoubleLabel>
        <TextFieldDoubleLabel label="Password:">
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submitRef.current?.click();
              }
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
                        <VisibilityOff color="primary" />
                      : <Visibility color="primary" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Enter Password"
            error={errorText !== ""}
            helperText={errorText}
            variant="outlined"
            size="small"
            sx={{
              width: 1,
              borderColor: "primary.main",
            }}
          />
        </TextFieldDoubleLabel>
        <Button
          ref={submitRef}
          onClick={() => {
            login.mutate({ username, password });
          }}
          variant="outlined"
          sx={{
            mt: 1,
          }}>
          Submit
        </Button>
      </Box>
      <Button
        onClick={() => {
          navigate("/");
        }}
        variant="contained"
        sx={{
          position: "absolute",
          right: `${borderMarginPx + borderWidthPx + 20}px`,
          bottom: `${borderMarginPx + borderWidthPx + 20}px`,
        }}>
        Return to Home
      </Button>
    </GridBorder>
  );
}
