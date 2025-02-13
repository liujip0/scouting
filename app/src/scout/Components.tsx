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
};
export function Counter({ value, setValue }: CounterProps) {
  //TODO
  return (
    <Stack direction="row">
      <IconButton>
        <Add />
        <TextField
          value={value}
          onChange={(event) => {
            setValue(parseInt(event.currentTarget.value));
          }}
        />
        <Remove />
      </IconButton>
    </Stack>
  );
}

type CircleToggleProps = {
  value: boolean;
  setValue: (value: boolean) => void;
  label: string;
  sx: SxProps;
};
export function CircleToggle({
  value,
  setValue,
  label,
  sx,
}: CircleToggleProps) {
  return (
    <ToggleButton
      value="toggle"
      selected={value}
      onChange={() => {
        setValue(!value);
      }}
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
      }}>
      {label}
    </ToggleButton>
  );
}

//TODO: remove soon
type OldCounterProps = {
  label: string;
  value: number;
  setValue: (value: number) => void;
};
export function OldCounter({
  label,
  value, //Value of the input box
  setValue,
}: OldCounterProps) {
  const buttonSx = {
    padding: 1,
    width: "min-content",
    height: 1,
  };

  return (
    <Stack
      direction="row"
      sx={{
        width: 1, //Same as width: '100%'
        justifyContent: "space-between", //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container
      }}>
      {
        //Group the label and input together with a horizontal stack
      }
      <Typography>{label.toUpperCase()}</Typography>
      <Stack direction="row">
        {
          //Group the minus button, number input, and plus button with a horizontal stack
        }
        <Button
          variant="contained"
          //  This () => {} is the same as function() {}
          // It's just another syntax for defining functions
          onClick={() => {
            setValue(value - 1);
          }}
          sx={buttonSx}>
          <Remove />
        </Button>
        <TextField
          type="number"
          value={value}
          //   This (event) => {} is the same as function(event) {}
          onChange={(event) => {
            //  This vvvvvvvv converts ("parses") a string into an integer
            setValue(parseInt(event.currentTarget.value));
            //          This  ^^^^^^^^^^^^^^^^^^^^^^^^^ is how you get the current value of the textbox
          }}
          sx={{
            width: "5em",
          }}
          slotProps={{
            htmlInput: {
              sx: {
                padding: 1,
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            setValue(value + 1);
          }}
          sx={buttonSx}>
          <Add />
        </Button>
      </Stack>
    </Stack>
  );
}
