import axios from "axios";

const BASE_URL = "http://localhost:4001/orders";

export interface Order {
  id: number;
  user_id: number;
  mesa: string | null;
  estado: "pendiente" | "preparando" | "listo" | "entregado";
  total: string; // viene como string desde la DB
  created_at: string;
}

interface OrderResponse {
  success: boolean;
  data: Order[];
}

export const getOrders = () =>
  axios.get<OrderResponse>(BASE_URL).then((res) => res.data.data);

export const createOrder = (data: {
  user_id: number;
  total: number;
  estado?: string;
  mesa?: string;
  items?: { menu_id: number; cantidad: number; subtotal: number }[];
}) =>
  axios.post<OrderResponse>(BASE_URL, data).then((res) => res.data.data);

export const updateOrderStatus = (id: number, estado: string) =>
  axios
    .patch<OrderResponse>(`${BASE_URL}/${id}/estado`, { estado })
    .then((res) => res.data.data);
