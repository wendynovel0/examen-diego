import express from "express";
import { OrderController } from "../controllers/order.controller";

const router = express.Router();
const controller = new OrderController();

router.post("/", controller.create);
router.get("/", controller.list);
router.patch("/:id/estado", controller.updateStatus);

export default router;
