import { Router } from 'express';
import { KitchenController } from '../controllers/kitchen.controller.js';

const router = Router();
const controller = new KitchenController();

router.get('/pending', controller.getPendingOrders.bind(controller));
router.put('/:id/start', controller.startPreparation.bind(controller));
router.put('/:id/ready', controller.markAsReady.bind(controller));

export default router;
