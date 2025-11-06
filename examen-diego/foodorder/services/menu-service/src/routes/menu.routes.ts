import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";

const router = Router();
const controller = new MenuController();

router.get("/menu", controller.getMenu.bind(controller));

export default router;
