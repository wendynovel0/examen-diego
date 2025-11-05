import express from "express";
import dotenv from "dotenv";
import ordersRouter from "./routes/orders.routes.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/orders", ordersRouter);

app.get("/", (req, res) => {
  res.json({ message: "Orders Service is running 🚀" });
});

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
