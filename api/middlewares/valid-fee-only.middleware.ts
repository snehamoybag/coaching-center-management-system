import { RequestHandler } from "express";
import { findById as findFeeById } from "../models/fee.model";
import { ErrorNotFound } from "../libs/http-exceptions";

const validFeeOnly: RequestHandler = async (req, res, next) => {
  const feeId = req.params.id;

  const limit = 1;
  const fee = await findFeeById(feeId, limit);

  if (!fee) {
    throw new ErrorNotFound(`Fee with the id '${feeId} is not found.'`);
  }

  return next();
};

export default validFeeOnly;
