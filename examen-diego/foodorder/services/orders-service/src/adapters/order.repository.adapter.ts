import { Order } from "../models/order.model.js";
import { v4 as uuid } from "uuid";

const orders: Order[] = [];

export class OrderRepositoryAdapter {
  async create(orderData: Omit<Order, "id" | "fecha">): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: uuid(),
      fecha: new Date().toISOString(),
    };
    orders.push(newOrder);
    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    return orders;
  }

  async findById(id: string): Promise<Order | undefined> {
    return orders.find(o => o.id === id);
  }

  async updateStatus(id: string, estado: Order["estado"]): Promise<Order | undefined> {
    const order = orders.find(o => o.id === id);
    if (order) order.estado = estado;
    return order;
  }
}
