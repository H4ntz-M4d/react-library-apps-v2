import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import GenreList from "./apps/genres/pages/GenreApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/genre" element={<GenreList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
