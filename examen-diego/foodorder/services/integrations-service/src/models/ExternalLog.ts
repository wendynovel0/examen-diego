import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class ExternalLog extends Model {
  public id!: number;
  public system_name!: string;
  public payload!: object;
  public success!: boolean;
}

ExternalLog.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    system_name: { type: DataTypes.STRING(100) },
    payload: { type: DataTypes.JSON },
    success: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: "external_logs", timestamps: false }
);
