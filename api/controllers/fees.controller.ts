import { RequestHandler } from "express";
import * as feeValidation from "../validations/fee.validation";
import handleFormValidationErrors from "../middlewares/handle-form-validation-errors.middleware";
import { studentIds as validateStudentIds } from "../validations/batch.validation";
import * as feeModel from "../models/fee.model";
import { SuccessResponse } from "../libs/http-response-shapes";
import {
  getNormalizedLimit,
  getNormalizedOffset,
  getOrder,
} from "../libs/format-url-queries";

const optional = true;

export const create: RequestHandler[] = [
  feeValidation.name(),
  feeValidation.amount(),
  validateStudentIds("studentIds", optional),

  handleFormValidationErrors,

  async (req, res) => {
    const { name, studentIds } = req.body;
    const amount = Number(req.body.amount);

    const fee = await feeModel.create(name, amount, studentIds);

    return res.json(new SuccessResponse("Fee created successfully.", { fee }));
  },
];

export const update: RequestHandler[] = [
  feeValidation.name(optional),
  feeValidation.amount(optional),
  validateStudentIds("addedStudentIds", optional),
  validateStudentIds("removedStudentIds", optional),

  handleFormValidationErrors,

  async (req, res) => {
    const feeId = req.params.id;
    const { name, addedStudentIds, removedStudentIds } = req.body;
    const amount = Number(req.body.amount);

    const fee = await feeModel.update(
      feeId,
      name,
      amount,
      addedStudentIds,
      removedStudentIds,
    );

    return res.json(
      new SuccessResponse(
        `Fee with the id '${feeId}' has been successfully updated.`,
        { fee },
      ),
    );
  },
];

export const deleteOne: RequestHandler = async (req, res) => {
  const feeId = req.params.id;
  const fee = await feeModel.deleteById(feeId);

  return res.json(
    new SuccessResponse(
      `Fee with the id '${feeId}' has been successfully deleted.`,
      { fee },
    ),
  );
};

export const getMany: RequestHandler = async (req, res) => {
  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const fees = await feeModel.findMany(limit, offset, order);

  return res.json(new SuccessResponse("List of fees.", { fees }));
};

export const getById: RequestHandler = async (req, res) => {
  const feeId = req.params.id;
  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const fee = await feeModel.findById(feeId, limit, offset, order);

  return res.json(new SuccessResponse(`Fee with the id '${feeId}'.`, { fee }));
};
