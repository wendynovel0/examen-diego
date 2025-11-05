// src/models/index.ts
import { Order } from "./Order.js";
import { OrderItem } from "./OrderItem.js";

// Relaciones
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

export { Order, OrderItem };
