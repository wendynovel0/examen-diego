import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service.js";

const service = new NotificationService();

export class NotificationController {
  async send(req: Request, res: Response) {
    const result = await service.notify(req.body.event, req.body.data);
    res.json({ success: true, data: result });
  }
}
