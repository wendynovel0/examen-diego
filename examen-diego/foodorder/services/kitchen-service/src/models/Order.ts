// src/models/Order.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";

export class Order extends Model {
  public id!: number;
  public user_id!: number;
  public estado!: string;
  public total!: number;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    estado: {
      type: DataTypes.ENUM(
        "pendiente",
        "preparando",
        "listo",
        "entregado",
        "pagado",
        "cancelado"
      ),
      defaultValue: "pendiente",
    },
    total: { type: DataTypes.DECIMAL(10, 2) },
  },
  { sequelize, tableName: "orders", timestamps: false }
);

Order.belongsTo(User, { foreignKey: "user_id", as: "usuario" });
