import { TeamMatchEntryColumns } from "@isa2025/api/src/dbtypes.ts";
import { ContentCopy, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
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
  const [showPublicApiToken, setShowPublicApiToken] = useState(false);
  const [linkIncludesToken, setLinkIncludesToken] = useState(false);
  const [showAuthorization, setShowAuthorization] = useState(false);

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
          padding: 1,
        }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            textWrap: "wrap",
          }}>
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
              label={
                column.startsWith("auto") ? column.replace("auto", "auto\u200b")
                : column.startsWith("teleop") ?
                  column.replace("teleop", "teleop\u200b")
                : column.startsWith("endgame") ?
                  column.replace("endgame", "endgame\u200b")
                : column.startsWith("postmatch") ?
                  column.replace("postmatch", "postmatch\u200b")
                : column
              }
            />
          ))}
        </Stack>
      </Stack>
      <Divider orientation="vertical" />
      <Stack
        sx={{
          flex: 1,
          padding: 2,
        }}
        gap={1}>
        <TextField
          value={publicApiToken.data}
          slotProps={{
            input: {
              endAdornment: (
                <>
                  <IconButton
                    onClick={() => {
                      setShowPublicApiToken(!showPublicApiToken);
                    }}>
                    {showPublicApiToken ?
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
                </>
              ),
            },
          }}
          type={showPublicApiToken ? "text" : "password"}
          disabled
          label="publicApiToken"
          variant="outlined"
          sx={(theme) => {
            return {
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: theme.palette.text.primary,
                color: theme.palette.text.primary,
              },
            };
          }}
        />
        <Divider
          sx={{
            mt: 2,
            mb: 2,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={linkIncludesToken}
              onChange={(event) => {
                setLinkIncludesToken(event.currentTarget.checked);
              }}
            />
          }
          label="Include token in link"
        />
        <TextField
          value={
            import.meta.env.VITE_SERVER_URL +
            "/public/data?include=" +
            columns.map((value) => (value ? 1 : 0)).join("") +
            (linkIncludesToken ? "&token=" + publicApiToken.data : "")
          }
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  onClick={() => {
                    if (publicApiToken.data) {
                      navigator.clipboard.writeText(
                        import.meta.env.VITE_SERVER_URL +
                          "/public/data?include=" +
                          columns.map((value) => (value ? 1 : 0)).join("") +
                          (linkIncludesToken ?
                            "&token=" + publicApiToken.data
                          : "")
                      );
                    }
                  }}>
                  <ContentCopy />
                </IconButton>
              ),
            },
          }}
          label="API Link"
          sx={{
            mb: 1,
          }}
        />
        {!linkIncludesToken && (
          <TextField
            value={"Bearer " + publicApiToken.data}
            slotProps={{
              input: {
                endAdornment: (
                  <>
                    <IconButton
                      onClick={() => {
                        setShowAuthorization(!showAuthorization);
                      }}>
                      {showAuthorization ?
                        <VisibilityOff />
                      : <Visibility />}
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        if (publicApiToken.data) {
                          navigator.clipboard.writeText(
                            "Bearer " + publicApiToken.data
                          );
                        }
                      }}>
                      <ContentCopy />
                    </IconButton>
                  </>
                ),
              },
            }}
            type={showAuthorization ? "text" : "password"}
            label='"Authorization" Header'
          />
        )}
        <Divider
          sx={{
            mt: 2,
            mb: 2,
          }}
        />
        {
          //TODO: export as file
        }
        <Button variant="outlined">Export as JSON</Button>
        <Button variant="outlined">Export as CSV</Button>
        <Button variant="outlined">Export as XLSX</Button>
      </Stack>
    </Stack>
  );
}
