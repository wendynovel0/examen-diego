import express from "express";
import kitchenRoutes from "./routes/kitchen.routes.js";

const app = express();
app.use(express.json());
app.use("/kitchen", kitchenRoutes);

app.listen(3003, () => console.log("Kitchen Service running on 3003"));
