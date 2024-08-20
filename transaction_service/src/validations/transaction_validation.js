import { body } from "express-validator";

// route => /send
export function sendValidation() {
  return [
    body("amount").notEmpty(),
    body("to").notEmpty(),
    body("fromAccount").notEmpty(),

    body("amount").isNumeric(),
    body("to").isString(),
    body("fromAccount").isNumeric(),
  ];
}

// route => /withdraw
export function withdrawValidation() {
  return [
    body("amount").notEmpty(),
    body("fromAccount").notEmpty(),

    body("amount").isNumeric(),
    body("fromAccount").isNumeric(),
  ];
}


// route => /recurring
export function recurringValidation() {
  return [
    body("amount").notEmpty(),
    body("to").notEmpty(),
    body("fromAccount").notEmpty(),
    body("days").notEmpty(),

    body("amount").isNumeric(),
    body("to").isString(),
    body("fromAccount").isNumeric(),
    body("days").isInt({min: 1, max: 31}),
  ];
}
