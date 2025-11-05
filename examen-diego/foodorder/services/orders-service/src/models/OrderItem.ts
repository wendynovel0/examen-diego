import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class OrderItem extends Model {
  public id!: number;
  public order_id!: number;
  public menu_id!: number;
  public cantidad!: number;
  public subtotal!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    menu_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_items",
    timestamps: false,
  }
);
