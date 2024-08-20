import { Router } from "express";
import authRouter from './auth_routes.js';
import paymentRouter from './payment_routes.js';

const IndexRouter = Router();

IndexRouter.use(authRouter);
IndexRouter.use(paymentRouter);

export default IndexRouter;