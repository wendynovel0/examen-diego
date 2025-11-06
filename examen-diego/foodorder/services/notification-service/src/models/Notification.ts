import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class Notification extends Model {
  public id!: number;
  public type!: string;
  public message!: string;
}

Notification.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING(100), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, tableName: "notifications", timestamps: false }
);
