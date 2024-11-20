import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./LandingPage.tsx";
import Scout from "./scout/Scout.tsx";
import ViewData from "./viewdata/ViewData.tsx";

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#000f5d", // Indiana Flag Blue
      contrastText: "#fff",
    },
    secondary: {
      main: "#d59f0f", // Indiana Flag Gold
      contrastText: "#000",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
