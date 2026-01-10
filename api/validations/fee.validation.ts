import { body } from "express-validator";
import { findByName as findFeeByName } from "../models/fee.model";

export const name = (isOptional: boolean = false) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 255;

  return body("name")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Fee name is required.")
    .isString()
    .withMessage("Fee name must be of type string.")
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(`Fee name must be beween ${MIN_LENGTH} and ${MAX_LENGTH}.`)
    .custom(async (name) => {
      const feeWithSameName = await findFeeByName(name, 0);

      if (feeWithSameName) {
        throw new Error("Fee with the same name already exists.");
      }

      return true;
    });
};

export const amount = (isOptional: boolean = false) => {
  return body("amount")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Fee amount is required.")
    .isNumeric()
    .withMessage("Fee amount must be in numbers.");
};
