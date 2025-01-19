import axios from "axios";
import { BASE_URL } from "./constants";

export const axiosInstance= axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // will help me send the cookie with each request
});
