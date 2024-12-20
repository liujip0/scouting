import { TeamMatchEntryColumns } from "@isa2025/api/src/dbtypes.ts";
import { ContentCopy, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { trpc } from "../utils/Trpc.tsx";

type ExportDataProps = {
  hidden: boolean;
};
export default function ExportData({ hidden }: ExportDataProps) {
  const [columns, setColumns] = useState<boolean[]>(
    new Array(TeamMatchEntryColumns.length).fill(true)
  );
  const [showApiToken, setShowApiToken] = useState(false);

  const publicApiToken = trpc.users.publicApiToken.useQuery();

  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        padding: 2,
        display: hidden ? "none" : "flex",
      }}
      direction="row">
      <Stack
        sx={{
          flex: 1,
        }}>
        <Typography
          variant="body1"
          fontWeight="bold">
          Select columns to include in link
        </Typography>
        <Stack
          sx={{
            flex: 1,
            overflowY: "scroll",
          }}>
          {TeamMatchEntryColumns.map((column, columnIndex) => (
            <FormControlLabel
              key={column}
              checked={columns[columnIndex]}
              onChange={(_event, checked) => {
                setColumns(
                  columns.map((value, valueIndex) =>
                    valueIndex === columnIndex ? checked : value
                  )
                );
              }}
              control={<Checkbox />}
              label={column}
            />
          ))}
        </Stack>
      </Stack>
      <Divider orientation="vertical" />
      <Stack
        sx={{
          flex: 1,
          padding: 1,
        }}>
        <TextField
          value={publicApiToken.data}
          slotProps={{
            input: {
              endAdornment: (
                <Stack direction="row">
                  <IconButton
                    onClick={() => {
                      setShowApiToken(!showApiToken);
                    }}>
                    {showApiToken ?
                      <VisibilityOff />
                    : <Visibility />}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      if (publicApiToken.data) {
                        navigator.clipboard.writeText(publicApiToken.data);
                      }
                    }}>
                    <ContentCopy />
                  </IconButton>
                </Stack>
              ),
            },
          }}
          label="publicApiToken"
          type={showApiToken ? "text" : "password"}
          disabled
          variant="standard"
          sx={(theme) => {
            return {
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: theme.palette.text.primary,
                color: theme.palette.text.primary,
              },
            };
          }}
        />
      </Stack>
    </Stack>
  );
}
