export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
export const AUTH_URL = "api/auth";
export const MSG_URL = "api/message";
