import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";

const app = express();
app.use(express.json());
app.use("/inventory", inventoryRoutes);
app.listen(3006, () => console.log("Inventory Service running on 3006"));
