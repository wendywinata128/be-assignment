import { ResponseError } from "../entity/response-error.js";

export const responseErrorUnauthorized = () => {
  throw new ResponseError(401, "Access is Unauthorized");
};

export const responseErrorNotFound = (word) => {
  throw new ResponseError(400, `${word ?? "Data"} not found`);
};

export const responseErrorDuplicated = () => {
  throw new ResponseError(400, "Data Duplicated");
};

export const responseError = (status, message, errors) => {
  throw new ResponseError(status, message, errors);
};
