import { styled, ToggleButton } from "@mui/material";

export const StyledToggleButton = styled(ToggleButton)((theme) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: theme.theme.palette.primary.main,
  },
  color: theme.theme.palette.primary.main,
  borderColor: theme.theme.palette.primary.main,
  padding: 1,
}));

export const StyledRedToggleButton = styled(ToggleButton)((theme) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: theme.theme.palette.error.main,
  },
  color: theme.theme.palette.error.main,
  borderColor: theme.theme.palette.error.main,
  padding: 1,
}));
