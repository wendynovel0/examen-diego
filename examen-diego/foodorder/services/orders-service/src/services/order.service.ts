import { Order } from "../models/order.model";
import { OrderRepositoryAdapter } from "../adapters/order.repository.adapter";
import { CreateOrderDTO } from "../dtos/order.dto";

export class OrderService {
  private repo = new OrderRepositoryAdapter();

  async createOrder(data: CreateOrderDTO): Promise<Order> {
    return this.repo.create({ ...data, estado: "pendiente" });
  }

  async getOrders(): Promise<Order[]> {
    return this.repo.findAll();
  }

  async updateOrderStatus(id: string, estado: Order["estado"]): Promise<Order | undefined> {
    return this.repo.updateStatus(id, estado);
  }
}
