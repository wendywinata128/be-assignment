import { body } from "express-validator";

// route => POST payments
export function addPaymentValidation(){
    return [
        body('name').notEmpty(),
        body('name').isString(),

        body('amount').notEmpty(),
        body('amount').isNumeric(),

        body('currency').notEmpty(),
        body('currency').isString(),
    ]
}

// route => PUT payments
export function editPaymentValidation(){
    return [
        body('name').notEmpty(),
        body('name').isString(),

        body('amount').notEmpty(),
        body('amount').isNumeric(),

        body('currency').notEmpty(),
        body('currency').isString(),
    ]
}