import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const user = await service.login(req.body);
      res.json({ success: true, data: user });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = await service.register(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
