import { Request, Response } from "express";
import { MenuService } from "../services/menu.service.js";

const service = new MenuService();

export class MenuController {
  async create(req: Request, res: Response) {
    const item = await service.create(req.body);
    res.status(201).json({ success: true, data: item });
  }

  async list(req: Request, res: Response) {
    const items = await service.list();
    res.json({ success: true, data: items });
  }
}
