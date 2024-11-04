import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Scout from "./Scout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Scout />
  </StrictMode>
);
