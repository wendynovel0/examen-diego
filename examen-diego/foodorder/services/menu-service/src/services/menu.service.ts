import { MenuItem } from "../models/MenuItem";

export class MenuService {
  async getMenu() {
    try {
      const menu = await MenuItem.findAll();
      return menu.map(item => item.toJSON()); // convierte a JSON simple
    } catch (err) {
      console.error("Error al obtener el menú:", err);
      throw err;
    }
  }
}
