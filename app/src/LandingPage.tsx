import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        width: 1,
        height: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          color: "primary.contrastText",
          mb: 4,
        }}>
        Indiana Scouting Alliance 2025
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
        <LinkButton to="/scout">Scout</LinkButton>
        <LinkButton to="/data">View Data</LinkButton>
        <LinkButton to="/upload">Upload Data</LinkButton>
      </Box>
    </Box>
  );
}

type LinkButtonProps = {
  to: string;
  children: React.ReactNode;
};
function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Link to={to}>
      <Button
        variant="contained"
        sx={{
          width: 1,
        }}
        color="secondary">
        {children}
      </Button>
    </Link>
  );
}
