import { Router } from 'express';
import { BillingController } from '../controllers/billing.controller.js';

const router = Router();
const controller = new BillingController();

router.post('/pay', controller.processPayment.bind(controller));
router.get('/receipt/:orderId', controller.getReceipt.bind(controller));
router.get('/transactions', controller.listTransactions.bind(controller));

export default router;
