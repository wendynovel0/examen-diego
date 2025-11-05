import { Router } from 'express';
import { getOrders, createOrder, updateOrderState } from '../controllers/orders.controller';

export const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.patch('/:id/state', updateOrderState);
