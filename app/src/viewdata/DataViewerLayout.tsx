import { Link } from "react-router-dom";

export default function DataViewerLayout() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid red",
        display: "flex",
        flexDirection: "column",
      }}>
      <Link to="/">Back to Landing Page</Link>
      <div>DataViewerLayout</div>
    </div>
  );
}
