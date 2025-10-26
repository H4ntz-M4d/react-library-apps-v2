// src/services/api.auth.js
const BASE_AUTH = "http://localhost:2500/auth";

export const register = async (data) => {
  const res = await fetch(`${BASE_AUTH}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // penting: kirim cookie
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok || !body?.success) {
    let errorMessage = "Request failed";
    if (body?.message) {
      if (typeof body.message === "string") errorMessage = body.message;
      else if (typeof body.message === "object")
        errorMessage = Object.values(body.message).join(", ");
    }
    const err = new Error(errorMessage);
    err.validationErrors = body?.message;
    throw err;
  }

  // Server sets httpOnly cookies; frontend doesn't store tokens in localStorage.
  return body;
};

export const login = async (data) => {
  const res = await fetch(`${BASE_AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok || !body?.success) {
    let errorMessage = "Request failed";
    if (body?.message) {
      if (typeof body.message === "string") errorMessage = body.message;
      else if (typeof body.message === "object")
        errorMessage = Object.values(body.message).join(", ");
    }
    const err = new Error(errorMessage);
    err.validationErrors = body?.message;
    throw err;
  }

  // Do NOT store tokens in localStorage when using cookie-only approach.
  // Server already sets httpOnly cookies for access/refresh.
  return body;
};

export const logout = async (id_user) => {
  // call server logout so server can delete refresh token server-side and clear cookie
  const res = await fetch(`${BASE_AUTH}/logout/${id_user}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw body || new Error("Logout failed");
  }
  return body;
};