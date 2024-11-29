import {
  generateSaltToken,
  generateToken,
  hashPassword,
} from "@isa2025/api/src/utils/auth.ts";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Util() {
  const [password, setPassword] = useState("");
  const [saltToken, setSaltToken] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [token, setToken] = useState("");

  return (
    <TabPanel value="util">
      <Stack gap={2}>
        <Box>
          <Button
            onClick={() => {
              setSaltToken(generateSaltToken());
            }}>
            Generate Salt Token
          </Button>
          <TextField
            value={saltToken}
            onChange={(event) => {
              setSaltToken(event.currentTarget.value);
            }}
            label="Salt Token"
          />
        </Box>
        <TextField
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
          label="Password"
        />
        <Box>
          <Button
            onClick={async () => {
              setHashedPassword(await hashPassword(password, saltToken));
            }}>
            Hash
          </Button>
          <TextField
            value={hashedPassword}
            onChange={(event) => {
              setHashedPassword(event.currentTarget.value);
            }}
            label="Hashed Password"
          />
        </Box>
        <Box>
          <Button
            onClick={async () => {
              setToken(await generateToken(saltToken));
            }}>
            Generate Token
          </Button>
          <TextField
            value={token}
            onChange={(event) => {
              setToken(event.currentTarget.value);
            }}
            label="Token"
          />
        </Box>
      </Stack>
    </TabPanel>
  );
}
