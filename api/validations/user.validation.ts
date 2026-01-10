import { body } from "express-validator";
import {
  findByAadhaarNumber as findUserByAadhaarNumber,
  findByContactNumber as findUserByContactNumber,
  findByEmail as findUserByEmail,
} from "../models/user.model";
import { ActiveStatus, UserRole } from "../generated/prisma/enums";

export const name = (
  fieldName: "firstName" | "lastName",
  isOptional: boolean = false,
) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 35;
  const nameType = fieldName === "firstName" ? "First name" : "Last name";

  return body(fieldName)
    .optional(isOptional)
    .notEmpty()
    .withMessage(`${nameType} is require.`)
    .isAlpha()
    .withMessage(`${nameType} must contain only alphabetic characters.`)
    .trim()
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(`${nameType} must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
};

export const email = (isOptional: boolean = false) => {
  return body("email")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Unsupported email format.");
};

// checks if email is registered on our database.
// pass validation if not registered.
export const newEmail = () => {
  return body("email").custom(async (email: string) => {
    const userWithSameEmail = await findUserByEmail(email);

    if (userWithSameEmail) {
      throw new Error("Email address is already registered by another user.");
    }

    return true;
  });
};

export const password = (isOptional: boolean = false) => {
  const MIN_LENGTH = 6;
  const MAX_LENGTH = 55;

  return body("password")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Password is required.")
    .isString()
    .withMessage("Password must be of type string.")
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(`Password must be between ${MIN_LENGTH} and ${MAX_LENGTH}.`);
};

export const contactNumber = (isOptional: boolean = false) => {
  const LENGTH = 10; // indian number

  return body("contactNumber")
    .optional(isOptional)
    .notEmpty()
    .withMessage("Contact number is required.")
    .isNumeric()
    .withMessage("Contact number must only contain numeric characters.")
    .isLength({ min: LENGTH, max: LENGTH })
    .withMessage(`Contact number must have ${LENGTH} numeric characters.`)
    .custom(async (contactNumber: string) => {
      const userWithSameContactNumber =
        await findUserByContactNumber(contactNumber);

      if (userWithSameContactNumber) {
        throw new Error(
          "Contact number is already registered by another user.",
        );
      }

      return true;
    });
};

export const role = (isOptional: boolean = false) => {
  const roleValues = Object.values(UserRole) as string[];

  return body("role")
    .optional(isOptional)
    .custom((role: string) => {
      return roleValues.includes(role);
    })
    .withMessage(
      `User role must be one of these values ${roleValues.join(" / ")}.`,
    );
};

export const activeStatus = (isOptional: boolean = false) => {
  const statusValues = Object.values(ActiveStatus) as string[];

  return body("activeStatus")
    .optional(isOptional)
    .custom((status: string) => {
      return statusValues.includes(status);
    })
    .withMessage(
      `Active status must be one of these values ${statusValues.join(" / ")}.`,
    );
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
    .custom(async (aadhaarNumberValue) => {
      const userWithSameAadhaarNumber =
        await findUserByAadhaarNumber(aadhaarNumberValue);

      if (userWithSameAadhaarNumber) {
        throw new Error("Aadhaar number already registered.");
      }

      return true;
    });
};

export const batchIds = (fieldName: string, isOptional: boolean = false) => {
  return body(fieldName)
    .optional(isOptional)
    .isArray()
    .withMessage("Batch ids must be an array of strings.")
    .custom((values: unknown[]) => {
      return values.every((value) => typeof value === "string");
    })
    .withMessage("Batch id must be a string.");
};
