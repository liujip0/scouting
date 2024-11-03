import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ViewData from "./ViewData.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ViewData />
  </StrictMode>
);
