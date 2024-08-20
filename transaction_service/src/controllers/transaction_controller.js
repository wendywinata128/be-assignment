import { processTransaction } from "../process/core/transaction.js";
import { responseError } from "../utils/error-function.js";
import { responseSuccess } from "../utils/function.js";
import { prosesRecurring } from "../process/recurring.js";

export const sendMoney = async (req, res, next) => {
  try {
    const { amount, to, fromAccount, currency } = req.body;

    const result = await processTransaction({
      amount,
      currency,
      paymentAccountId: fromAccount,
      userId: req.user.id,
      type: "send",
      to: to,
      note: `Send money to ${to}`,
    });

    if (result.error) {
      return responseError(400, "Transaction Failed", result.error);
    }

    responseSuccess(res, "Send money success", result);
  } catch (e) {
    next(e);
  }
};

export const withdrawMoney = async (req, res, next) => {
  try {
    const { amount, fromAccount, currency } = req.body;

    const result = await processTransaction({
      amount,
      currency,
      paymentAccountId: fromAccount,
      userId: req.user.id,
      type: "withdraw",
    });

    if (result.error) {
      return responseError(400, "Transaction Failed", result.error);
    }

    responseSuccess(res, "Withdraw money success", result);
  } catch (e) {
    next(e);
  }
};

export const recurringPayment = async (req, res, next) => {
  try {
    const { amount, to, fromAccount, currency, days } = req.body;
    const transaction = {
      amount,
      currency,
      paymentAccountId: fromAccount,
      userId: req.user.id,
      type: "recurring",
      to: to,
      note: `Send money to ${to}`,
    };

    await prosesRecurring(transaction, days, req.user.id);

    responseSuccess(
      res,
      `Your payment account will be automatically debited ${amount} every month on the ${days} as part of a recurring scheduled transaction.`,
      {
        days: days,
        transaction,
      }
    );
  } catch (e) {
    next(e);
  }
};
