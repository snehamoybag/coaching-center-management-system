import { RequestHandler } from "express";
import * as paymentValidation from "../validations/payment.validation";
import handleFormValidationErrors from "../middlewares/handle-form-validation-errors.middleware";
import * as paymentModel from "../models/payment.model";
import { SuccessResponse } from "../libs/http-response-shapes";
import {
  getNormalizedLimit,
  getNormalizedOffset,
  getOrder,
} from "../libs/format-url-queries";
import { ErrorNotFound } from "../libs/http-exceptions";

export const create: RequestHandler[] = [
  paymentValidation.amount(),
  paymentValidation.mode(),
  paymentValidation.studentId(),
  paymentValidation.feeId(),

  handleFormValidationErrors,

  async (req, res) => {
    const { mode, studentId, feeId } = req.body;
    const amount = Number(req.body.amount);

    const payment = await paymentModel.create({
      amount,
      mode,
      studentId,
      feeId,
    });

    return res.json(
      new SuccessResponse("Payment record created successfully.", {
        payement: payment,
      }),
    );
  },
];

export const getMany: RequestHandler = async (req, res) => {
  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const payments = await paymentModel.findMany(limit, offset, order);

  res.json(new SuccessResponse("List of payments.", { payments }));
};

export const getById: RequestHandler = async (req, res) => {
  const paymentId = req.params.id;

  const payment = await paymentModel.findById(paymentId);

  if (!paymentId) {
    throw new ErrorNotFound(`Payment with the id '${paymentId}' is not found.`);
  }

  return res.json(
    new SuccessResponse(`Payment record with the id '${paymentId}'.`, {
      payment,
    }),
  );
};
