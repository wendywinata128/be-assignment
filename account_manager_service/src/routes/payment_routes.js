import { Router } from "express";

import { getPaymentAccount, addNewPaymentAccount, editPaymentAccount, deletePaymentAccount, getPaymentHistory } from '../controllers/payment_controller.js';
import authenticated from "../middleware/authenticated.js";
import { addPaymentValidation, editPaymentValidation } from "../validations/payment_validation.js";
import { validateTheRequest } from "../validations/validation.js";
const paymentRouter = Router();

paymentRouter.use(authenticated);

paymentRouter.get("/payments", getPaymentAccount);
paymentRouter.post("/payments", addPaymentValidation(), validateTheRequest, addNewPaymentAccount);
paymentRouter.put("/payments/:id", editPaymentValidation(), validateTheRequest, editPaymentAccount);
paymentRouter.delete("/payments/:id", deletePaymentAccount);
paymentRouter.get("/payments/history", getPaymentHistory);

export default paymentRouter;
