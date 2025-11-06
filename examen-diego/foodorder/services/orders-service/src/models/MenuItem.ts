import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database"; // tu conexión a MySQL

// Definir la clase que extiende Model
export class MenuItem extends Model {
  public id!: number;
  public nombre!: string;
  public precio!: number;
  public disponible!: boolean;
}

// Inicializar el modelo
MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "menu_items",
    sequelize, // conexión a la DB
    timestamps: false,
  }
);
