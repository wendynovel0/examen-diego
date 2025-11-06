import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Order } from "./Order.js";

export class Transaction extends Model {
  public id!: number;
  public order_id!: number;
  public amount!: number;
  public status!: string;
}

Transaction.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM("pendiente", "pagado", "fallido"),
      defaultValue: "pagado",
    },
  },
  { sequelize, tableName: "transactions", timestamps: false }
);

Transaction.belongsTo(Order, { foreignKey: "order_id", as: "pedido" });
