import express from "express";
import menuRoutes from "./routes/menu.routes.js";

const app = express();
app.use(express.json());
app.use("/menu", menuRoutes);

const PORT = 3002;
app.listen(PORT, () => console.log(`Menu Service running on ${PORT}`));
