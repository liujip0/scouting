import { Box, Button, Stack, Typography } from "@mui/material";
import { GridBorder } from "../components/GridBorder.tsx";
import { ScoutPage } from "./Scout.tsx";

type ScoutPageContainerProps = {
  title: string | React.ReactNode;
  nowScouting?: {
    teamNumber: number;
    alliance: "Red" | "Blue";
    robotPosition: 1 | 2 | 3 | 4;
  };
  setPage?: (value: ScoutPage) => void;
  navButtons?: React.ReactNode;
  children?: React.ReactNode;
};
export function ScoutPageContainer({
  title,
  nowScouting,
  setPage,
  navButtons,
  children,
}: ScoutPageContainerProps) {
  return (
    <GridBorder>
      <Stack
        sx={{
          width: 1,
          height: 1,
        }}>
        <Stack
          sx={{
            width: 1,
            padding: 2,
            overflowX: "scroll",
          }}
          direction="row">
          {typeof title === "string" ?
            <Typography
              variant="h2"
              fontWeight="bold">
              {title.toUpperCase()}
            </Typography>
          : title}
          {nowScouting && (
            <Button
              sx={{
                backgroundColor:
                  nowScouting.alliance === "Blue" ? "#0000ff" : "#ff0000",
                color: "white",
                ml: "auto",
                fontSize: "large",
                height: 1,
                width: "max-content",
              }}
              onClick={() => {
                //TODO: confirmation about not saving data (or fix saving data)
                if (setPage) {
                  setPage("devicesetup");
                }
              }}>
              {nowScouting.teamNumber +
                "\u00a0/\u00a0" +
                nowScouting.alliance.toUpperCase() +
                "\u00a0" +
                (nowScouting.robotPosition === 4 ?
                  "HUMAN"
                : nowScouting.robotPosition)}
            </Button>
          )}
        </Stack>
        <Box
          sx={{
            width: 1,
            flex: 1,
            overflowY: "scroll",
          }}>
          {children}
        </Box>
        <Stack
          sx={{
            padding: 4,
            justifyContent: "right",
          }}
          direction="row"
          gap={3}>
          {navButtons}
        </Stack>
      </Stack>
    </GridBorder>
  );
}
