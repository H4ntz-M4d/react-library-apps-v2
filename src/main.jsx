import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import GenreList from "./apps/genres/pages/GenreApp";
import { BookApp } from "./apps/books/pages/BookApp";
import { BookCreateUpdate } from "./apps/books/pages/BookCreateUpdate";
import { AuthPage } from "./apps/auth/pages/AuthPage";
import { ProtectedRoute } from "./apps/auth/components/ProtectedRoute";
import { AuthProvider } from "./apps/auth/context/AuthContext";
import { StrictMode } from "react";
import { RolePage } from "./apps/roles/pages/RolePage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<App />}>
            <Route
              path="/list-role"
              element={
                <ProtectedRoute>
                  <RolePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/genre"
              element={
                <ProtectedRoute>
                  <GenreList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BookApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/create-book"
              element={
                <ProtectedRoute>
                  <BookCreateUpdate />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
