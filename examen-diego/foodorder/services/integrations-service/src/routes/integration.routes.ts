import { Router } from 'express';
import { IntegrationController } from '../controllers/integration.controller.js';

const router = Router();
const controller = new IntegrationController();

router.post('/gateway', controller.connectToPaymentGateway.bind(controller));
router.post('/notify', controller.notifyExternalSystem.bind(controller));

export default router;
