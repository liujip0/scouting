import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./LandingPage.tsx";
import Scout from "./scout/Scout.tsx";
import ViewData from "./viewdata/ViewData.tsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("%PUBLIC_URL%/serviceworker.js");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/scout",
    element: <Scout />,
  },
  {
    path: "/viewdata",
    element: <ViewData />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
