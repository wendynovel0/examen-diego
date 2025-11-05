import { MenuItem } from "../models/menu.model.js";
import { v4 as uuid } from "uuid";

const menu: MenuItem[] = [];

export class MenuRepositoryAdapter {
  async create(item: Omit<MenuItem, "id">): Promise<MenuItem> {
    const newItem = { id: uuid(), ...item };
    menu.push(newItem);
    return newItem;
  }

  async findAll(): Promise<MenuItem[]> {
    return menu;
  }
}
