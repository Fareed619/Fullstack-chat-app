export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
export const AUTH_URL = "/auth";
export const MSG_URL = "/message";
