import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as orderRoutes } from './routes/orders.routes';

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/orders', orderRoutes);
