import axios from "axios";
import { backend_url } from "../server";

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: backend_url,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});