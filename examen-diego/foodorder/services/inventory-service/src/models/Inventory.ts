import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { MenuItem } from "./MenuItem.js";

export class Inventory extends Model {
  public id!: number;
  public menu_id!: number;
  public stock!: number;
}

Inventory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    menu_id: { type: DataTypes.INTEGER, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, tableName: "inventory", timestamps: false }
);

// Relación
Inventory.belongsTo(MenuItem, { foreignKey: "menu_id", as: "menu" });
