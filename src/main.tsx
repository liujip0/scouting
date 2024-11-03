import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./LandingPage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>
);
