import { body } from "express-validator";
import { PaymentMode } from "../generated/prisma/enums";
import { findById as findStudentById } from "../models/student.model";
import { findById as findFeeById } from "../models/fee.model";

export const amount = () => {
  return body("amount")
    .notEmpty()
    .withMessage("Payment amount is required.")
    .isNumeric()
    .withMessage("Payment amount must be in numbers.");
};

export const mode = () => {
  return body("mode")
    .notEmpty()
    .withMessage("Payment mode is required.")
    .custom((mode) => {
      const validModes = Object.values(PaymentMode);

      if (!validModes.includes(mode)) {
        throw new Error(
          `Payment mode must be one these values ${validModes.join(" / ")}`,
        );
      }

      return true;
    });
};

export const studentId = () => {
  return body("studentId")
    .notEmpty()
    .withMessage("Student id is required.")
    .isString()
    .withMessage("Student id must be a string.")
    .custom(async (studentIdValue) => {
      const student = await findStudentById("ADMIN", studentIdValue);

      if (!student) {
        throw new Error(
          `Student with the id '${studentIdValue}' is not found.`,
        );
      }

      return true;
    });
};

export const feeId = () => {
  return body("feeId")
    .notEmpty()
    .withMessage("Fee id is required.")
    .isString()
    .withMessage("Fee is must be a string.")
    .custom(async (feeIdValue) => {
      const fee = await findFeeById(feeIdValue);

      if (!fee) {
        throw new Error(`Fee with the id '${feeIdValue}' is not found.`);
      }

      return true;
    });
};
