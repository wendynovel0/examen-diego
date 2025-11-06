import express from "express";
import { NotificationController } from "../controllers/notification.controller";

const router = express.Router();
const controller = new NotificationController();

router.post("/", controller.send);

export default router;
