import { Order } from "./Order";
import { OrderItem } from "./OrderItem";

// Definir relaciones
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

// Exportar modelos
export { Order, OrderItem };
