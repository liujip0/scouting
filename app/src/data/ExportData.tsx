import { TeamMatchEntryColumns } from "@isa2025/api/src/dbtypes.ts";
import { ContentCopy } from "@mui/icons-material";
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

type ExportDataProps = {
  hidden: boolean;
};
export default function ExportData({ hidden }: ExportDataProps) {
  const [columns, setColumns] = useState<boolean[]>(
    new Array(TeamMatchEntryColumns.length).fill(true)
  );

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
        }}>
        <TextField
          // value={user.publicApiToken}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  onClick={() => {
                    // navigator.clipboard.writeText(user.publicApiToken);
                  }}>
                  <ContentCopy />
                </IconButton>
              ),
            },
          }}
          // type={showApiTokens ? "text" : "password"}
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
