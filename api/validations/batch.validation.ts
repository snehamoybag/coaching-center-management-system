import { body } from "express-validator";
import { findByName as findBatchByName } from "../models/batch.model";

export const name = (isOptional: boolean = false) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 255;

  return body("name")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Batch name is required.")
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage(
      "Only letters, numbers, and underscores are allowed in batch name.",
    )
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(`Batch Name must be between ${MIN_LENGTH} and ${MAX_LENGTH}`)
    .custom(async (name: string) => {
      const batchWithSameName = await findBatchByName(name);

      if (batchWithSameName) {
        throw new Error(`Batch with the name '${name}' already exists.`);
      }

      return true;
    });
};
