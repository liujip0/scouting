import {
  HumanPlayerEntryColumn,
  TeamMatchEntryColumn,
} from "@isa2025/api/src/utils/dbtypes.ts";
import { ContentCopy, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  lighten,
  Stack,
  styled,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderWidth: 3,
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.5),
    "&:hover": {
      backgroundColor: lighten(theme.palette.primary.light, 0.5),
    },
  },
}));

type ExportLayoutProps = {
  showPublicApiToken: boolean;
  setShowPublicApiToken: (value: boolean) => void;
  linkIncludesToken: boolean;
  setLinkIncludesToken: (value: boolean) => void;
  showAuthorization: boolean;
  setShowAuthorization: (value: boolean) => void;
  publicApiToken: string | undefined;
  robotColumnsInit: TeamMatchEntryColumn[];
  humanColumnsInit: HumanPlayerEntryColumn[];
  linkBase: string;
};
export default function ExportLayout({
  showPublicApiToken,
  setShowPublicApiToken,
  linkIncludesToken,
  setLinkIncludesToken,
  showAuthorization,
  setShowAuthorization,
  publicApiToken,
  robotColumnsInit,
  humanColumnsInit,
  linkBase,
}: ExportLayoutProps) {
  const [robotColumns, setRobotColumns] = useState<boolean[]>(
    new Array(robotColumnsInit.length).fill(true)
  );
  const [humanColumns, setHumanColumns] = useState<boolean[]>(
    new Array(humanColumnsInit.length).fill(true)
  );
  useEffect(() => {
    setRobotColumns(new Array(robotColumnsInit.length).fill(true));
    setHumanColumns(new Array(humanColumnsInit.length).fill(true));
  }, [robotColumnsInit, humanColumnsInit]);

  const [fileType, setFileType] = useState<"json" | "csv" | "xlsx">("json");

  const getApiLink = () => {
    return (
      import.meta.env.VITE_SERVER_URL +
      linkBase +
      fileType +
      "?include=" +
      (robotColumnsInit.length > 0 ?
        robotColumns.map((value) => (value ? 1 : 0)).join("")
      : "") +
      (humanColumnsInit.length > 0 ?
        humanColumns.map((value) => (value ? 1 : 0)).join("")
      : "") +
      (linkIncludesToken ? "&token=" + publicApiToken : "")
    );
  };

  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        padding: 2,
      }}
      direction="row">
      <Stack
        sx={{
          flex: 1,
          padding: 1,
          height: 1,
        }}>
        {robotColumnsInit.length > 0 && (
          <>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                textWrap: "wrap",
              }}>
              Select columns to include in robot data
            </Typography>
            <Stack
              sx={{
                flex: 1,
                height: 1,
                overflowY: "scroll",
              }}>
              {robotColumnsInit.map((column, columnIndex) => (
                <FormControlLabel
                  key={column}
                  checked={robotColumns[columnIndex]}
                  onChange={(_event, checked) => {
                    setRobotColumns(
                      robotColumns.map((value, valueIndex) =>
                        valueIndex === columnIndex ? checked : value
                      )
                    );
                  }}
                  control={<Checkbox />}
                  label={
                    column.startsWith("auto") ?
                      column.replace("auto", "auto\u200b")
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
          </>
        )}
        {humanColumnsInit.length > 0 && (
          <>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                textWrap: "wrap",
                mt: 2,
              }}>
              Select columns to include in human data
            </Typography>
            <Stack
              sx={{
                flex: 1,
                height: 1,
                overflowY: "scroll",
              }}>
              {humanColumnsInit.map((column, columnIndex) => (
                <FormControlLabel
                  key={column}
                  checked={humanColumns[columnIndex]}
                  onChange={(_event, checked) => {
                    setHumanColumns(
                      humanColumns.map((value, valueIndex) =>
                        valueIndex === columnIndex ? checked : value
                      )
                    );
                  }}
                  control={<Checkbox />}
                  label={column}
                />
              ))}
            </Stack>
          </>
        )}
      </Stack>
      <Divider orientation="vertical" />
      <Stack
        sx={{
          flex: 1,
          padding: 2,
          overflowY: "scroll",
        }}
        gap={1}>
        <ToggleButtonGroup
          value={fileType}
          exclusive
          onChange={(_event, value) => {
            if (value) {
              setFileType(value);
            }
          }}
          color="primary"
          sx={{
            width: 1,
          }}>
          <StyledToggleButton value="json">JSON</StyledToggleButton>
          <StyledToggleButton value="csv">CSV</StyledToggleButton>
          <StyledToggleButton value="xlsx">XLSX</StyledToggleButton>
        </ToggleButtonGroup>
        <Divider
          sx={{
            mt: 2,
            mb: 2,
          }}
        />
        <TextField
          value={publicApiToken ?? ""}
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
                      if (publicApiToken) {
                        navigator.clipboard.writeText(publicApiToken);
                      }
                    }}>
                    <ContentCopy />
                  </IconButton>
                </>
              ),
            },
            inputLabel: {
              shrink: true,
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
          value={getApiLink()}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  onClick={() => {
                    if (publicApiToken) {
                      navigator.clipboard.writeText(getApiLink());
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
            value={"Bearer " + publicApiToken}
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
                        if (publicApiToken) {
                          navigator.clipboard.writeText(
                            "Bearer " + publicApiToken
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
        <Button
          variant="outlined"
          onClick={async () => {
            const res = await (
              await fetch(getApiLink(), {
                headers: {
                  Authorization: "Bearer " + publicApiToken,
                },
              })
            ).text();
            console.log(res);

            const date = new Date();

            const a = document.createElement("a");
            a.setAttribute(
              "href",
              URL.createObjectURL(
                new Blob([res], {
                  type: "text/plain",
                })
              )
            );
            a.setAttribute(
              "download",
              "ISA_" +
                date.getFullYear().toString().padStart(4, "0") +
                "." +
                (date.getMonth() + 1).toString().padStart(2, "0") +
                "." +
                date.getDate().toString().padStart(2, "0") +
                "_" +
                date.getHours().toString().padStart(2, "0") +
                "." +
                date.getMinutes().toString().padStart(2, "0") +
                "." +
                date.getSeconds().toString().padStart(2, "0") +
                "." +
                fileType
            );
            a.setAttribute("target", "_blank");
            a.click();
          }}>
          Download File
        </Button>
        <Button
          variant="outlined"
          onClick={async () => {
            const res = await (
              await fetch(getApiLink(), {
                headers: {
                  Authorization: "Bearer " + publicApiToken,
                },
              })
            ).text();
            console.log(res);

            const date = new Date();

            const a = document.createElement("a");
            a.setAttribute(
              "href",
              URL.createObjectURL(
                new Blob([res], {
                  type: "text/plain",
                })
              )
            );
            a.setAttribute(
              "download",
              "ISA_" +
                date.getFullYear().toString().padStart(4, "0") +
                "." +
                (date.getMonth() + 1).toString().padStart(2, "0") +
                "." +
                date.getDate().toString().padStart(2, "0") +
                "_" +
                date.getHours().toString().padStart(2, "0") +
                "." +
                date.getMinutes().toString().padStart(2, "0") +
                "." +
                date.getSeconds().toString().padStart(2, "0") +
                ".txt"
            );
            a.setAttribute("target", "_blank");
            a.click();
          }}>
          Download as TXT
        </Button>
      </Stack>
    </Stack>
  );
}
