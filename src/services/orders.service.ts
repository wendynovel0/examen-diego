import type { Order } from "../models/order.model.js";
import type { CreateOrderDto } from "../dtos/order.dto.js";

export class OrdersService {
  private orders: Order[] = [];

  findAll(): Order[] {
    return this.orders;
  }

  findById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  create(data: CreateOrderDto): Order {
    const newOrder: Order = {
      id: (Math.random() * 10000).toFixed(0),
      customerName: data.customerName,
      items: data.items,
      total: data.total,
      status: "pending",
      createdAt: new Date(),
    };

    this.orders.push(newOrder);
    return newOrder;
  }
}
