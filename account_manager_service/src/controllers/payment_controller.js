import prisma from "../config/prisma.js";
import { findCurrency } from "../lib/currencies/currencies.js";
import { responseErrorNotFound } from "../utils/error-function.js";
import { responseSuccess } from "../utils/function.js";

export const getPaymentAccount = async (req, res, next) => {
  try {
    const result = await prisma.paymentAccount.findMany({
      where: {
        userId: req.user.id,
      },
    });

    responseSuccess(res, "Retrieve payment account data success", result);
  } catch (e) {
    next(e);
  }
};

export const addNewPaymentAccount = async (req, res, next) => {
  try {
    const { name, amount, currency } = req.body;

    const currencyData = findCurrency(currency);

    if (!currencyData) {
      return responseErrorNotFound("Currency");
    }

    const result = await prisma.paymentAccount.create({
      data: {
        amount,
        name,
        currency,
        userId: req.user.id,
      },
    });

    responseSuccess(res, "Add new payment account data success", result);
  } catch (e) {
    next(e);
  }
};

export const editPaymentAccount = async (req, res, next) => {
  try {
    const { name, amount, currency } = req.body;

    const currencyData = findCurrency(currency);

    if (!currencyData) {
      return responseErrorNotFound("Currency");
    }

    const { id } = req.params;

    const payment = await prisma.paymentAccount.findFirst({
      where: {
        id: +id,
        userId: req.user.id,
      },
    });

    if (!payment) {
      return responseErrorNotFound("Payment Account");
    }

    payment.name = name;
    payment.amount = amount;
    payment.currency = currency;

    const updatedResult = await prisma.paymentAccount.update({
      data: payment,
      where: {
        id: payment.id,
      },
    });

    responseSuccess(res, "Edit payment account data success", updatedResult);
  } catch (e) {
    next(e);
  }
};

export const deletePaymentAccount = async (req, res, next) => {
  try {
    const params = req.params;

    const paymentAccount = await prisma.paymentAccount.findUnique({
      where: {
        id: +params.id
      }
    })

    if(!paymentAccount){
      return responseErrorNotFound('Payment Account');
    }


    const result = await prisma.paymentAccount.delete({
      where: {
        id: paymentAccount.id,
        userId: req.user.id,
      },
    });

    res.json({ result });
  } catch (e) {
    next(e);
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const result = await prisma.paymentHistory.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        transaction: true,
      },
    });

    res.json(result);
  } catch (e) {
    next(e);
  }
};
