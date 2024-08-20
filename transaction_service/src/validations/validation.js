import { validationResult } from "express-validator";
import { responseError } from "../utils/error-function.js";

export function validateTheRequest(req, res, next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        responseError(400, 'Field validation failed', errors.array())
    }

    next();
}