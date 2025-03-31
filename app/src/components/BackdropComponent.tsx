import { Backdrop } from "@mui/material";

type BackdropComponentProps = {
  open: boolean;
  onClose?: () => void;
};
export default function BackdropComponent({
  open,
  onClose,
}: BackdropComponentProps) {
  return (
    <Backdrop
      open={open}
      onClick={() => {
        if (onClose) {
          onClose();
        }
      }}
      sx={{
        position: "absolute",
      }}
    />
  );
}
