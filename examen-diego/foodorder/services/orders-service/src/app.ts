import express from "express";
import { connectDB } from "./config/database";
import { Order, OrderItem } from "./models/index.js";
import orderRoutes from "./routes/order.routes";

const app = express();
app.use(express.json());

app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Orders Service running on port ${PORT}`);
  });
});
