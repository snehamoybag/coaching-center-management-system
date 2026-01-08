import { RequestHandler } from "express";
import { findById as findBatchById } from "../models/batch.model";
import { ErrorNotFound } from "../libs/http-exceptions";

const validBatchOnly: RequestHandler = async (req, _res, next) => {
  const batchId = req.params.id;

  const batch = await findBatchById(batchId);

  if (!batch) {
    throw new ErrorNotFound(`Batch with the id '${batchId}' is not found.`);
  }

  return next();
};

export default validBatchOnly;
