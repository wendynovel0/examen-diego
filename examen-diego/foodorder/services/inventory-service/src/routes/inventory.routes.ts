import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller.js';

const router = Router();
const controller = new InventoryController();

router.get('/', controller.getInventory.bind(controller));
router.post('/decrease', controller.decreaseStock.bind(controller));
router.post('/increase', controller.increaseStock.bind(controller));

export default router;
