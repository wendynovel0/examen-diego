import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service.js';

export class InventoryController {
  private inventoryService = new InventoryService();

  async getInventory(req: Request, res: Response) {
    const items = await this.inventoryService.getInventory();
    res.json({ success: true, data: items });
  }

  async decreaseStock(req: Request, res: Response) {
    const result = await this.inventoryService.decreaseStock(req.body);
    res.json({ success: true, data: result });
  }

  async increaseStock(req: Request, res: Response) {
    const result = await this.inventoryService.increaseStock(req.body);
    res.json({ success: true, data: result });
  }
}
