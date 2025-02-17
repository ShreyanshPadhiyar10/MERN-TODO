import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Universal backend URL
  headers: {
    "Content-Type": "application/json",
  },
});