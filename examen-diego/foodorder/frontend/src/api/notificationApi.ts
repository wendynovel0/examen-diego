// src/api/notificationsApi.ts
import axios from "axios";

export interface Notification {
  id: number;
  type: string;
  message: string;
  created_at: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const res = await axios.get<Notification[]>("http://localhost:4005/notifications");
  return res.data;
};
