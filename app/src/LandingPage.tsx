import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to="/scout">Scout</Link>
      <br />
      <Link to="/viewdata">View or Manage Data</Link>
    </div>
  );
}
