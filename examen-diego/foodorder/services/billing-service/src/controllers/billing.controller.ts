import { Request, Response } from 'express';
import { BillingService } from '../services/billing.service.js';

export class BillingController {
  private billingService = new BillingService();

  async processPayment(req: Request, res: Response) {
    try {
      const result = await this.billingService.processPayment(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  }

  async getReceipt(req: Request, res: Response) {
    try {
      const receipt = await this.billingService.getReceipt(req.params.orderId);
      res.json({ success: true, data: receipt });
    } catch (error) {
      res.status(404).json({ success: false, message: (error as Error).message });
    }
  }

  async listTransactions(req: Request, res: Response) {
    try {
      const transactions = await this.billingService.listTransactions();
      res.json({ success: true, data: transactions });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }
}
