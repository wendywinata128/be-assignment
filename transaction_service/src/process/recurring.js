import prisma from "../config/prisma.js";
import cron from "node-cron";
import { processTransaction } from "./core/transaction.js";

export async function prosesRecurring(transaction, days, userId) {
  let recurring;

  if (transaction.recurringId) {
    recurring = await prisma.transactionRecurring.findUnique({
      where: {
        id: transaction.recurringId,
      },
    });
  } else {
    delete transaction.recurringId
    recurring = await prisma.transactionRecurring.create({
      data: {
        days: days,
        amount: transaction.amount,
        currency: transaction.currency,
        to: transaction.to,
        status: true,
        paymentAccountId: transaction.paymentAccountId,
        userId: userId,
      },
    });
  }

  if (recurring.status) {
    delete transaction.recurringId;
    const task = cron.schedule(`* * ${days} * * *`, async () => {
      console.log(
        `debited proccess for user ${recurring.userId} with recurring id of ${recurring.id}`
      );
      const result = await processTransaction(transaction);

      if (result.error) {
        //  we can tell the user by notification or etc
        //  that the transaction is error and caused by something (ex: wallet is running out of money)
        console.log(result.error);
        task.stop();
        await prisma.transactionRecurring.update({
          where: {
            id: recurring.id,
          },
          data: {
            status: false,
          },
        });
      }
    });
  }
}

export async function initRecurring() {
  // init recurring in our application on first time the application open
  const recurringTransactions = await prisma.transactionRecurring.findMany({
    where: {
      status: true,
    },
  });

  if (recurringTransactions.length === 0) {
    console.log("no pending recurring proccess...");
  }

  for (let rec of recurringTransactions) {
    console.log(
      `recurring proccess for user ${rec.userId} with recurring id of ${rec.id}`
    );
    prosesRecurring(
      {
        amount: rec.amount,
        currency: rec.currency,
        paymentAccountId: rec.paymentAccountId,
        userId: rec.userId,
        type: "recurring",
        to: rec.to,
        note: `Send money to ${rec.to}`,
        recurringId: rec.id,
      },
      rec.days,
      rec.userId
    );
  }
}
