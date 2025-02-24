import { Add, Remove } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  SxProps,
  TextField,
  ToggleButton,
} from "@mui/material";

type CounterProps = {
  value: number;
  setValue: (value: number) => void;
  sx?: SxProps;
};
export function Counter({ value, setValue, sx }: CounterProps) {
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
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
        }}>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
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
          sx={(theme) => ({
            color: "secondary.contrastText",
            backgroundColor: "secondary.main",
            width: "3em",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: theme.palette.text.primary,
              color: theme.palette.text.primary,
            },
          })}
          slotProps={{
            htmlInput: {
              sx: {
                padding: "2px",
              },
            },
          }}
          disabled
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
        {/* <IconButton
          onClick={(event) => {
            event.stopPropagation();
            setValue(value + 1);
          }}
          sx={buttonSx}>
          <Add />
        </IconButton> */}
      </Stack>
    </Stack>
  );
}

type AutoL1CounterProps = {
  value: number;
  setValue: (value: number) => void;
  max?: number;
  sx?: SxProps;
};
export function AutoL1Counter({
  value,
  setValue,
  max,
  sx,
}: AutoL1CounterProps) {
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
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
        }}>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            if (value > 0) {
              setValue(value - 1);
            }
          }}
          sx={buttonSx}>
          <Remove />
        </IconButton>
        <TextField
          value={"L1 - " + value}
          size="small"
          sx={(theme) => ({
            color: "secondary.contrastText",
            backgroundColor: "secondary.main",
            width: "4em",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: theme.palette.text.primary,
              color: theme.palette.text.primary,
            },
          })}
          slotProps={{
            htmlInput: {
              sx: {
                padding: "2px",
              },
            },
          }}
          disabled
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            if (max === undefined || value < max) {
              console.log(max);
              setValue(value + 1);
            }
          }}
          sx={buttonSx}>
          <Add />
        </IconButton>
      </Stack>
    </Stack>
  );
}

type BigCounterProps = {
  value: number;
  increment: () => void;
  decrement: () => void;
  label: string;
  max?: number;
};
export function BigCounter({
  value,
  increment,
  decrement,
  label,
  max,
}: BigCounterProps) {
  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
      }}>
      <Button
        onClick={() => {
          if (value > 0) {
            decrement();
          }
        }}
        variant="contained">
        <Remove />
      </Button>
      <TextField
        value={value}
        label={label}
      />
      <Button
        onClick={() => {
          if (max === undefined || value < max) {
            increment();
          }
        }}
        variant="contained">
        <Add />
      </Button>
    </Stack>
  );
}

type TransparentToggleProps = {
  value: boolean;
  setValue: (value: boolean) => void;
  label: string;
  disabled?: boolean;
  error: boolean;
  sx: {
    width?: string;
    height?: string;
    transform?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
};
export function TransparentToggle({
  value,
  setValue,
  label,
  disabled,
  error,
  sx,
}: TransparentToggleProps) {
  return (
    <ToggleButton
      value="toggle"
      selected={value}
      onChange={() => {
        setValue(!value);
      }}
      disabled={disabled}
      sx={(theme) => ({
        ...sx,
        position: "absolute",
        color: !error ? theme.palette.secondary.main : theme.palette.error.main,
        backgroundColor: theme.palette.primary.main + "40",
        borderColor:
          !error ? theme.palette.secondary.main : theme.palette.error.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main + "40",
        },
        padding: 1,
        borderWidth: 2,
        "&.Mui-selected, &.Mui-selected:hover": {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
        },
      })}>
      {label}
    </ToggleButton>
  );
}

type AutoReefButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  sx: {
    position: string;
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
    transform: string;
  };
  coralStates: {
    L4: boolean;
    L3: boolean;
    L2: boolean;
    L1: number;
  };
  selected?: boolean;
};
export function AutoReefButton({
  onClick,
  sx,
  coralStates,
  selected = false,
}: AutoReefButtonProps) {
  return (
    <Button
      onClick={onClick}
      sx={(theme) => ({
        ...sx,
        color: selected ? "white" : "primary.main",
        background: `linear-gradient(
                      to bottom,
                      ${coralStates.L4 ? theme.palette.primary.main : theme.palette.secondary.main} 25%,
                      ${coralStates.L3 ? theme.palette.primary.main : theme.palette.secondary.main} 25% 50%,
                      ${coralStates.L2 ? theme.palette.primary.main : theme.palette.secondary.main} 50% 75%,
                      #00000000 75%
                    ),
                    linear-gradient(
                      to right,
                      ${coralStates.L1 >= 1 ? theme.palette.primary.main : theme.palette.secondary.main} 16.7%,
                      ${coralStates.L1 >= 2 ? theme.palette.primary.main : theme.palette.secondary.main} 16.7% 33.3%,
                      ${coralStates.L1 >= 3 ? theme.palette.primary.main : theme.palette.secondary.main} 33.3% 50%,
                      ${coralStates.L1 >= 4 ? theme.palette.primary.main : theme.palette.secondary.main} 50% 66.7%,
                      ${coralStates.L1 >= 5 ? theme.palette.primary.main : theme.palette.secondary.main} 66.7% 83.3%,
                      ${coralStates.L1 >= 6 ? theme.palette.primary.main : theme.palette.secondary.main} 83.3%
                    )`,
        border: selected ? "8px solid " + theme.palette.primary.main : "none",
        width: "2em",
        height: "4em",
        [theme.breakpoints.down("md")]: {
          width: "1em",
          height: "2em",
        },
      })}></Button>
  );
}
