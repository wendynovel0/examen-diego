import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json({ success: true, data: order });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async list(req: Request, res: Response) {
    const orders = await orderService.getOrders();
    res.json({ success: true, data: orders });
  }

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { estado } = req.body;
    const updated = await orderService.updateOrderStatus(Number(id), estado);
    if (!updated) return res.status(404).json({ success: false, message: "Pedido no encontrado" });
    res.json({ success: true, data: updated });
  }

  async byMesa(req: Request, res: Response) {
    const { mesa } = req.params;
    const orders = await orderService.getOrdersByMesa(mesa);
    res.json({ success: true, data: orders });
  }

  async byUser(req: Request, res: Response) {
    const { user_id } = req.params;
    const orders = await orderService.getOrdersByUser(Number(user_id));
    res.json({ success: true, data: orders });
  }
}
