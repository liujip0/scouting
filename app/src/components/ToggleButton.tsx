import { styled, ToggleButton } from "@mui/material";

export const StyledToggleButton = styled(ToggleButton)((theme) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: theme.theme.palette.primary.main,
  },
  color: theme.theme.palette.primary.main,
  borderColor: theme.theme.palette.primary.main,
}));
