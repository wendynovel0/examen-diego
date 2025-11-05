import { Request, Response } from 'express';

export const getOrders = (req: Request, res: Response) => {
  res.json({ message: 'List of orders' });
};

export const createOrder = (req: Request, res: Response) => {
  const order = req.body;
  // aquí iría la lógica para guardar en BD
  res.status(201).json({ message: 'Order created', order });
};

export const updateOrderState = (req: Request, res: Response) => {
  const { id } = req.params;
  const { to_state } = req.body;
  res.json({ message: `Order ${id} updated to ${to_state}` });
};
