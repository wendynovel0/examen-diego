import express from "express";
import { MenuController } from "../controllers/menu.controller.js";

const router = express.Router();
const controller = new MenuController();

router.post("/", controller.create);
router.get("/", controller.list);

export default router;
