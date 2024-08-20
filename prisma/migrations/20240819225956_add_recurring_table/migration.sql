-- CreateTable
CREATE TABLE "TransactionRecurring" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "paymentAccountId" INTEGER NOT NULL,

    CONSTRAINT "TransactionRecurring_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionRecurring" ADD CONSTRAINT "TransactionRecurring_paymentAccountId_fkey" FOREIGN KEY ("paymentAccountId") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
