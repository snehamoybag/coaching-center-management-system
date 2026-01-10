import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { FailureResponse } from "../libs/http-response-shapes";

const handleFormValidationErrors: RequestHandler = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }

  const statusCode = 400;
  return res.status(statusCode).json(
    new FailureResponse(statusCode, "Form validation failed.", {
      errors: validationErrors.mapped(),
    }),
  );
};

export default handleFormValidationErrors;
