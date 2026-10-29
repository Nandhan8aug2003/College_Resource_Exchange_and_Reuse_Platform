export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "https://college-backend.onrender.com";