import { BrowserRouter, Route, Routes } from "react-router-dom";
import Data from "./data/Data.tsx";
import LandingPage from "./LandingPage.tsx";
import Scout from "./scout/Scout.tsx";
import Upload from "./upload/Upload.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/data/*"
          element={<Data />}
        />
        <Route
          path="/scout"
          element={<Scout />}
        />
        <Route
          path="/upload"
          element={<Upload />}
        />
      </Routes>
    </BrowserRouter>
  );
}
