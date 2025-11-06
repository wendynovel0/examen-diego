import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class MenuItem extends Model {
  public id!: number;
  public nombre!: string;
  public precio!: number;
  public disponible!: boolean;
}

MenuItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: "menu_items", timestamps: false }
);
