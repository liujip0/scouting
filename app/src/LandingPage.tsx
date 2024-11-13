import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000f5d",
        padding: "2em",
      }}>
      <h1
        style={{
          color: "white",
          fontFamily: "sans-serif",
          marginBottom: "1.5em",
          textAlign: "center",
        }}>
        Indiana Scouting Alliance 2025
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}>
        <LinkButton to="/scout">Scout</LinkButton>
        <LinkButton to="/viewdata">View or Manage Data</LinkButton>
      </div>
    </div>
  );
}

type LinkButtonProps = {
  to: string;
  children: React.ReactNode;
};
function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Link
      to={to}
      style={{
        marginBottom: "1.5em",
      }}>
      <button
        style={{
          width: "100%",
          borderRadius: "0",
          border: "none",
          padding: "1em",
          backgroundColor: "#d59f0f",
        }}>
        {children}
      </button>
    </Link>
  );
}
