import { ValidationError } from "express-validator";
import { ValidationErrorItem } from "joi";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationErrorItem[]) {
    super("Invalid Request Parameters");

    //Only because we are extending a built in classs
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.message, field: err.context?.key };
    });
  }
}
