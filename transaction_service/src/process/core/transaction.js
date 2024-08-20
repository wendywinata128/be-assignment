import prisma from "../../config/prisma.js";
import {
  convertCurrencies,
  findCurrency,
} from "../../lib/currencies/currencies.js";
import { checkIfReceiverExist } from "../send-money.js";

export async function processTransaction(transaction) {
  // this is core transaction process
  try {
    if (transaction.to) {
      //  in real case we also have to check if the receiver (to) is exist
      const receiver = checkIfReceiverExist(transaction.to);

      if (!receiver) {
        return { error: "Receiver is Not Exist" };
      }
    }

    const paymentAccount = await prisma.paymentAccount.findUnique({
      where: {
        id: transaction.paymentAccountId,
      },
    });

    if (!paymentAccount) {
      //  Payment account is not exists
      return { error: "Payment account is not exists" };
    }

    if (paymentAccount.userId != transaction.userId) {
      //  if user trying to access Payment account owned by another users
      return { error: "Payment account is not exists" };
    }

    if (!transaction.currency) {
      //  if theres no currency defined in the transaction, the currency will follow its payment account.
      transaction.currency = paymentAccount.currency;
    } else {
      const currencyData = findCurrency(transaction.currency);

      if (!currencyData) {
        return { error: "Currency is not exist" };
      }
    }

    const valueConverted = convertCurrencies(
      transaction.amount,
      transaction.currency,
      paymentAccount.currency
    );
    transaction.amount_converted = valueConverted;

    const balance_left = paymentAccount.amount - valueConverted;
    if (balance_left < 0) {
      // payment balance is not enough to do transaction
      return {
        error: `Payment balance is not enough to do transaction - balance left: ${paymentAccount.amount}`,
      };
    }

    const result = await prisma.$transaction(async (tx) => {
      const resultQuery = await tx.transaction.create({
        data: transaction,
      });

      // maybe we can do this in other services
      await tx.paymentHistory.create({
        data: {
          balance_left: balance_left,
          transactionId: resultQuery.id,
          userId: transaction.userId,
        },
      });

      await tx.paymentAccount.update({
        where: {
          id: paymentAccount.id,
        },
        data: {
          amount: balance_left,
        },
      });

      return resultQuery;
    });

    return result;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
}
