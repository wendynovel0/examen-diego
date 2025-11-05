import type { Request, Response } from "express";
import { OrdersService } from "../services/orders.service.js";

const service = new OrdersService();

export const getOrders = (req: Request, res: Response) => {
  const orders = service.findAll();
  res.json({ success: true, data: orders });
};

export const getOrderById = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ success: false, message: "Missing ID" });

  const order = service.findById(id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });

  res.json({ success: true, data: order });
};

export const createOrder = (req: Request, res: Response) => {
  const order = service.create(req.body);
  res.status(201).json({ success: true, data: order });
};
