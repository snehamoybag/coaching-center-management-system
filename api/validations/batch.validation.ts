import { body, param } from "express-validator";
import {
  findByName as findBatchByName,
  findById as findBatchById,
} from "../models/batch.model";

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

export const studentIds = (fieldName: string, isOptional: boolean = false) => {
  return body(fieldName)
    .optional(isOptional)
    .notEmpty()
    .withMessage("Student ids are required.")
    .isArray({ min: 1 })
    .withMessage("Student ids must be an array of strings.")
    .custom((studentsArr: unknown[]) => {
      return studentsArr.every((id) => typeof id === "string");
    })
    .withMessage("Student id must be of type string.");
};

export const teacherIds = (fieldName: string, isOptional: boolean = false) => {
  return body(fieldName)
    .optional(isOptional)
    .notEmpty()
    .withMessage("Teacher ids are required.")
    .isArray({ min: 1 })
    .withMessage("Teacher ids must be an array of strings.")
    .custom((teachersArr: unknown[]) => {
      return teachersArr.every((id) => typeof id === "string");
    })
    .withMessage("Teacher id must be of type string.");
};

export const idParams = () => {
  return param("id").custom(async (batchId) => {
    const batchWithId = await findBatchById(batchId);

    if (!batchWithId) {
      throw new Error(`Batch with the id '${batchId}' is not found.`);
    }

    return true;
  });
};
