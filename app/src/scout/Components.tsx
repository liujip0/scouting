import { Add, Remove } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  SxProps,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";

type CounterProps = {
  value: number;
  setValue: (value: number) => void;
  label: string;
  sx?: SxProps;
};
export function Counter({ value, setValue, label, sx }: CounterProps) {
  const buttonSx: SxProps = {
    color: "primary.contrastText",
    backgroundColor: "primary.main",
    borderRadius: 2,
    pl: 0,
    pr: 0,
    "&:hover": {
      backgroundColor: "primary.main",
    },
  };

  return (
    <Stack sx={sx}>
      <Typography
        fontSize="caption"
        sx={{
          //TODO
          display: "none",
        }}>
        {label}
      </Typography>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
        }}>
        <IconButton
          onClick={() => {
            if (value > 0) {
              setValue(value - 1);
            }
          }}
          sx={buttonSx}>
          <Remove />
        </IconButton>
        <TextField
          value={value}
          size="small"
          sx={{
            color: "secondary.contrastText",
            backgroundColor: "secondary.main",
            width: "3em",
          }}
          slotProps={{
            htmlInput: {
              sx: {
                padding: "2px",
              },
            },
          }}
        />
        <IconButton
          onClick={() => {
            setValue(value + 1);
          }}
          sx={buttonSx}>
          <Add />
        </IconButton>
      </Stack>
    </Stack>
  );
}

type CircleToggleProps = {
  value: boolean;
  setValue: (value: boolean) => void;
  label: string;
  disabled?: boolean;
  sx: SxProps;
};
export function CircleToggle({
  value,
  setValue,
  label,
  disabled,
  sx,
}: CircleToggleProps) {
  return (
    <ToggleButton
      value="toggle"
      selected={value}
      onChange={() => {
        setValue(!value);
      }}
      disabled={disabled}
      sx={{
        ...sx,
        "&.Mui-selected, &.Mui-selected:hover": {
          color: "white",
          backgroundColor: "primary.main",
        },
        color: "primary.main",
        backgroundColor: "secondary.main",
        borderColor: "secondary.main",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
        padding: 1,
        borderWidth: 4,
      }}>
      {label}
    </ToggleButton>
  );
}

type CircleButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  sx: SxProps;
};
export function CircleButton({ label, onClick, sx }: CircleButtonProps) {
  return (
    <Button
      onClick={onClick}
      sx={{
        ...sx,
        "&.Mui-selected, &.Mui-selected:hover": {
          color: "white",
          backgroundColor: "primary.main",
        },
        color: "primary.main",
        backgroundColor: "secondary.main",
        borderColor: "secondary.main",
        "&:hover": {
          backgroundColor: "secondary.main",
        },
        padding: 0.5,
        minWidth: 0,
        minHeight: 0,
        borderWidth: 4,
      }}>
      {label}
    </Button>
  );
}
