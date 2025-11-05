import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    const token = await service.login(req.body);
    res.json({ success: true, token });
  }

  async register(req: Request, res: Response) {
    const user = await service.register(req.body);
    res.status(201).json({ success: true, data: user });
  }
}
