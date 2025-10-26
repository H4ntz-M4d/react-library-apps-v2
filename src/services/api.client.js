const baseURL = import.meta.env.VITE_API_URL || "";

export const apiFetch = async (url, options = {}) => {
    const res = await fetch(baseURL + url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    return res.json();
  };
  