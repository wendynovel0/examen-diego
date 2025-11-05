import { Request, Response } from 'express';
import { IntegrationService } from '../services/integration.service.js';

export class IntegrationController {
  private integrationService = new IntegrationService();

  async connectToPaymentGateway(req: Request, res: Response) {
    const response = await this.integrationService.connectPayment(req.body);
    res.json({ success: true, data: response });
  }

  async notifyExternalSystem(req: Request, res: Response) {
    const result = await this.integrationService.notifySystem(req.body);
    res.json({ success: true, data: result });
  }
}
