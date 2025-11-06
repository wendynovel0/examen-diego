import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import { AuthController } from "./controllers/auth.controller";

const app = express();
app.use(cors());
app.use(express.json());

const authController = new AuthController();
app.post("/auth/login", (req, res) => authController.login(req, res));
app.post("/auth/register", (req, res) => authController.register(req, res));

sequelize.authenticate().then(() => {
  console.log("✅ Conexión a MySQL establecida correctamente");
  app.listen(4000, () => console.log("Auth Service corriendo en puerto 4000"));
});
