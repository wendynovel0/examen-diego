import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";

export class OrderService {
  // Crear pedido con items
  async createOrder(data: {
    user_id: number;
    mesa?: string;
    total: number;
    items: { menu_id: number; cantidad: number; subtotal: number }[];
  }): Promise<Order> {
    const order = await Order.create({
      user_id: data.user_id,
      total: data.total,
      mesa: data.mesa,
      estado: "pendiente",
    });

    const itemsWithOrderId = data.items.map((i) => ({
      ...i,
      order_id: order.id,
    }));
    await OrderItem.bulkCreate(itemsWithOrderId);

    return order;
  }

  // Listar todos los pedidos
  async getOrders(): Promise<Order[]> {
    return Order.findAll();
  }

  // Actualizar estado del pedido
  async updateOrderStatus(id: number, estado: Order["estado"]): Promise<Order | null> {
    const order = await Order.findByPk(id);
    if (!order) return null;
    order.estado = estado;
    await order.save();
    return order;
  }

  // Consultar pedidos por mesa
  async getOrdersByMesa(mesa: string): Promise<Order[]> {
    return Order.findAll({ where: { mesa } });
  }

  // Consultar pedidos por cliente (usuario)
  async getOrdersByUser(user_id: number): Promise<Order[]> {
    return Order.findAll({ where: { user_id } });
  }
}
