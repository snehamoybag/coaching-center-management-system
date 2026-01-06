import { body } from "express-validator";
import { findByAadhaarNumber as findStudentByAadhaarNumber } from "../models/student.model";
import { Request } from "express";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";
import { ErrorForbidden } from "../libs/http-exceptions";

export const parentName = (isOptional: boolean = false) => {
  const MIN_LENGTH = 5;
  const MAX_LENGTH = 75;

  return body("parentName")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Parent name is required.")
    .isString()
    .withMessage("Parent name must be a string.")
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(
      `Parent name must be between ${MIN_LENGTH} and ${MAX_LENGTH} character.`,
    )
    .custom((value: string) => {
      const [firstName, lastName] = value.split(" ");
      const alphaRegex = /^[a-zA-Z]+$/;

      if (!firstName) {
        throw new Error("parent's first name is required.");
      }

      if (!lastName) {
        throw new Error("parent's last name is required.");
      }

      if (!alphaRegex.test(firstName)) {
        throw new Error(
          "Parent's first name must contain only alphabetic characters.",
        );
      }

      if (!alphaRegex.test(lastName)) {
        throw new Error(
          "Parent's last name must contain only alphabetic characters.",
        );
      }

      return true;
    });
};

export const dateOfBirth = (isOptional: boolean = false) => {
  return body("dateOfBirth")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Date of birth is required.")
    .isString()
    .withMessage("Date of birth must be a string.")
    .custom((date: string) => {
      const DOBRegex = /^(\d\d)\/(\d\d)\/(\d\d\d\d)$/; // dd/mm/yyyy

      if (!DOBRegex.test(date)) {
        throw new Error(
          "Invalid format. Please provide date of birth in 'dd/mm/yyyy' format only.",
        );
      }

      const dateSplit = date.split("/");
      const dateInMMDDYYFormat = `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`;
      const isDateInvalid = isNaN(Number(new Date(dateInMMDDYYFormat))); // valid date is a number

      if (isDateInvalid) {
        throw new Error("Invalid date of birth.");
      }

      const birthYear = Number(dateSplit[2]);
      const currentYear = new Date().getFullYear();
      const oldestBirthYear = 1930;
      const youngestBirthYear = currentYear - 5;

      if (birthYear <= oldestBirthYear || birthYear >= youngestBirthYear) {
        throw new Error(
          `Birth year must be between ${oldestBirthYear} and ${youngestBirthYear}.`,
        );
      }

      return true;
    });
};

// multiple students can have same cantact number (e.g. siblings, same parent etc.)
export const contactNumber = (isOptional: boolean = false) => {
  const LENGTH = 10; // indian number

  return body("contactNumber")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Contact number is required.")
    .isNumeric()
    .withMessage("Contact number must only contain numeric characters.")
    .isLength({ min: LENGTH, max: LENGTH })
    .withMessage(`Contact number must have ${LENGTH} numeric characters.`);
};

export const aadhaarNumber = (isOptional: boolean = false) => {
  const LENGTH = 12;

  return body("aadhaarNumber")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Aadhaar number is required.")
    .isNumeric()
    .withMessage("Aadhaar number must be numeric.")
    .isLength({ min: LENGTH, max: LENGTH })
    .withMessage(`Aadhaar number must have ${LENGTH} numeric characters.`)
    .custom(async (aadhaarNumber: string, { req }) => {
      const user = assertUserInRequest(req as Request);

      if (user.role !== "ADMIN") {
        throw new ErrorForbidden("Only admin can register a student.");
      }

      const studentWithSameAadhaarNumber = await findStudentByAadhaarNumber(
        user.role,
        aadhaarNumber,
      );

      if (studentWithSameAadhaarNumber) {
        throw new Error(
          "Aadhaar number is already registerd by another student.",
        );
      }

      return true;
    });
};
