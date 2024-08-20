import { Router } from "express";

import authenticated from "../middleware/authenticated.js";
import { recurringPayment, sendMoney, withdrawMoney } from "../controllers/transaction_controller.js";
import { recurringValidation, sendValidation, withdrawValidation } from "../validations/transaction_validation.js";
import { validateTheRequest } from "../validations/validation.js";
const transactionRouter = Router();

transactionRouter.use(authenticated);

transactionRouter.post("/send", sendValidation(), validateTheRequest, sendMoney);
transactionRouter.post("/withdraw",withdrawValidation(), validateTheRequest, withdrawMoney);
transactionRouter.post("/recurring", recurringValidation(), validateTheRequest, recurringPayment);

export default transactionRouter;
