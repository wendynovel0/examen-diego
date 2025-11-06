import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Order extends Model {
  public id!: number;
  public user_id!: number;
  public estado!: string;
  public total!: number;
  public readonly created_at!: Date;
}

Order.init(
  {
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    estado: {
      type: DataTypes.ENUM('pendiente','preparando','listo','entregado','pagado','cancelado'),
      defaultValue: 'pendiente',
    },
    total: { type: DataTypes.DECIMAL(10,2), allowNull: true },
    mesa: { type: DataTypes.STRING, allowNull: true }, // <-- agregado
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'orders', timestamps: false }
);
