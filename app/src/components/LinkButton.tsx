import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  children: React.ReactNode;
  color:
    | "inherit"
    | "secondary"
    | "primary"
    | "success"
    | "error"
    | "info"
    | "warning";
};
export function LinkButton({ to, children, color }: LinkButtonProps) {
  return (
    <Link to={to}>
      <Button
        variant="contained"
        sx={{
          width: 1,
        }}
        color={color}>
        {children}
      </Button>
    </Link>
  );
}
