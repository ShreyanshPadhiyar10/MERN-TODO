import axios from "axios";
import { backend_url_vercel } from "../server";

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: backend_url_vercel,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});