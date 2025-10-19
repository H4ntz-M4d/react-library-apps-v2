import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import GenreList from "./apps/genres/pages/GenreApp";
import { BookApp } from "./apps/books/pages/BookApp";
import { BookCreateUpdate } from "./apps/books/pages/BookCreateUpdate";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/genre" element={<GenreList />} />
          <Route path="/books" element={<BookApp />} />
          <Route path="/books/create-book" element={<BookCreateUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
