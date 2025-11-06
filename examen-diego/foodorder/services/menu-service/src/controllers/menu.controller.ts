import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";

const menuService = new MenuService();

export class MenuController {
  async getMenu(req: Request, res: Response) {
    try {
      const menu = await menuService.getMenu();
      res.json(menu);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener el menú" });
    }
  }
}
