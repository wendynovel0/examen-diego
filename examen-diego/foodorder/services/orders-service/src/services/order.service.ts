import { Order, OrderItem } from "../models";
import { MenuItem } from "../models/MenuItem";

export class OrderService {
  async createOrder(data: {
    user_id: number;
    mesa?: string;
    total: number;
    items: { menu_id: number; cantidad: number; subtotal: number }[];
  }) {
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

    // 👇 Incluye los items al devolver el pedido
    return await Order.findByPk(order.id, { include: [{ model: OrderItem, as: "items" }] });
  }

  async getOrders() {
    return Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: MenuItem,
              as: "menu",
              attributes: ["nombre", "precio"], // 👈 solo lo necesario
            },
          ],
        },
      ],
    });
  }

  async updateOrderStatus(id: number, estado: string) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    order.estado = estado;
    await order.save();
    return order;
  }

  async getOrdersByMesa(mesa: string) {
    return Order.findAll({
      where: { mesa },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: MenuItem,
              as: "menu",
              attributes: ["nombre", "precio"],
            },
          ],
        },
      ],
    });
  }

  async getOrdersByUser(user_id: number) {
    return Order.findAll({
      where: { user_id },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: MenuItem,
              as: "menu",
              attributes: ["nombre", "precio"],
            },
          ],
        },
      ],
    });
  }
}
