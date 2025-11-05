import { Request, Response } from 'express';
import { KitchenService } from '../services/kitchen.service.js';

export class KitchenController {
  private kitchenService = new KitchenService();

  async getPendingOrders(req: Request, res: Response) {
    try {
      const orders = await this.kitchenService.getPendingOrders();
      res.json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }

  async startPreparation(req: Request, res: Response) {
    try {
      const updated = await this.kitchenService.updateStatus(req.params.id, 'en_preparacion');
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  }

  async markAsReady(req: Request, res: Response) {
    try {
      const updated = await this.kitchenService.updateStatus(req.params.id, 'listo');
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  }
}
