import { Router } from "express";
import TransactionRouter from './transaction_routes.js';

const IndexRouter = Router();

IndexRouter.use('/transaction', TransactionRouter);

export default IndexRouter;