import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Order } from "./Order.js";

export class KitchenOrder extends Model {
  public id!: number;
  public order_id!: number;
  public estado!: string;
}

KitchenOrder.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    estado: {
      type: DataTypes.ENUM("pendiente", "preparando", "listo", "entregado"),
      defaultValue: "pendiente",
    },
  },
  { sequelize, tableName: "kitchen_orders", timestamps: false }
);

KitchenOrder.belongsTo(Order, { foreignKey: "order_id", as: "pedido" });
