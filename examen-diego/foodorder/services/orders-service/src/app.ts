import express from "express";
import orderRoutes from "./routes/order.routes";
import { logger } from "./utils/logger";

const app = express();
app.use(express.json());

app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => logger.info(`Orders Service running on port ${PORT}`));
