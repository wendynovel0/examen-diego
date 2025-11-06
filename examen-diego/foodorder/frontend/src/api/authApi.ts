import axios from "axios";
import { API_URLS } from "./config";

interface LoginResponse {
  token: string;
  userId?: number; // opcional, según tu API
}

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URLS.auth}/auth/login`, { email, password });
  return res.data;
};
