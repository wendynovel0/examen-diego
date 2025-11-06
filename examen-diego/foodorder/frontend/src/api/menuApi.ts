import axios from "axios";
import { API_URLS } from "./config";

export const getMenu = async () => {
  const res = await axios.get(`${API_URLS.menu}/menu`);
  return res.data;
};
