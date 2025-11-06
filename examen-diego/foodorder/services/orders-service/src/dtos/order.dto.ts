export interface CreateOrderDTO {
  user_id: number;
  total: number;
  estado?: string;
  mesa?: string; // <--- agregamos mesa como opcional
}
