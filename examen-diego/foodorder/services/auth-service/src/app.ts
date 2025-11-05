import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Auth Service running on ${PORT}`));
