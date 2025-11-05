export interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}
