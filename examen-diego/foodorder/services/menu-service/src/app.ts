import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import { MenuController } from "./controllers/menu.controller";

const app = express();
app.use(cors());
app.use(express.json());

const menuController = new MenuController();
app.get("/menu", (req, res) => menuController.getMenu(req, res));

sequelize.authenticate().then(() => {
  console.log("✅ Menu Service conectado a MySQL");
  app.listen(4003, () => console.log("Menu Service corriendo en puerto 4003"));
});
