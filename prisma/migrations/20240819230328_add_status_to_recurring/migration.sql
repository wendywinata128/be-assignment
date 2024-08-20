/*
  Warnings:

  - Added the required column `status` to the `TransactionRecurring` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionRecurring" ADD COLUMN     "status" BOOLEAN NOT NULL;
