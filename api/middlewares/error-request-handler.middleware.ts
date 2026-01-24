import "dotenv/config";
import { ErrorRequestHandler } from "express";
import HttpExeception from "../libs/http-exceptions";
import { ErrorResponse } from "../libs/http-response-shapes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorRequestHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err && process.env.NODE_ENV !== "production") {
    console.log(err);
  }

  if (err instanceof HttpExeception) {
    res
      .status(err.statusCode)
      .json(new ErrorResponse(err.statusCode, err.message));
    return;
  }

  const unknownErrorStatusCode = 500;

  if (err instanceof Error) {
    res
      .status(unknownErrorStatusCode)
      .json(new ErrorResponse(unknownErrorStatusCode, err.message));
    return;
  }

  // everything else
  return res
    .status(unknownErrorStatusCode)
    .json(new ErrorResponse(unknownErrorStatusCode, "Internal server error."));
};

export default errorRequestHandler;
