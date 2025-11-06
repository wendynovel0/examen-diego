import express from "express";
import { OrderController } from "../controllers/order.controller";

const router = express.Router();
const controller = new OrderController();

router.post("/", controller.create); // Crear pedido
router.get("/", controller.list); // Listar todos
router.patch("/:id/estado", controller.updateStatus); // Actualizar estado
router.get("/mesa/:mesa", controller.byMesa); // Consultar por mesa
router.get("/user/:user_id", controller.byUser); // Consultar por usuario

export default router;
