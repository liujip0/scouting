import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Data from "./data/Data.tsx";
import ErrorPage from "./ErrorPage.tsx";
import "./index.css";
import LandingPage from "./LandingPage.tsx";
import Scout from "./scout/Scout.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: "scout",
          element: <Scout />,
        },
        {
          path: "data",
          element: <Data />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#000f5d", // Indiana Flag Blue
        contrastText: "#fff",
      },
      secondary: {
        main: "#d59f0f", // Indiana Flag Gold
        contrastText: "#000",
      },
      background: {
        default: "#f1dc8e", // Light Indiana Flag Gold
      },
    },
    typography: {
      h1: {
        fontSize: "5rem",
      },
      h2: {
        fontSize: "2rem",
      },
      body1: {
        fontSize: "1.5em",
      },
      button: {
        fontSize: "1.3em",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "#000f5d",
          },
        },
      },
    },
  })
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true }}
      />
    </ThemeProvider>
  </StrictMode>
);
