import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public role!: "cliente" | "admin" | "chef" | "cajero";
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.ENUM("cliente", "admin", "chef", "cajero"),
      defaultValue: "cliente",
    },
  },
  { sequelize, tableName: "users", timestamps: false }
);
