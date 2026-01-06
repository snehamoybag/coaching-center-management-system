import { RequestHandler } from "express";
import { activeStatus, name } from "../validations/user.validation";
import * as studentValidation from "../validations/student.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";
import * as studentModel from "../models/student.model";
import { StudentCreateInput } from "../generated/prisma/models";

const optional = true;

export const registerStudent: RequestHandler[] = [
  name("firstName"),
  name("lastName"),
  studentValidation.aadhaarNumber(),
  studentValidation.parentName(),
  studentValidation.dateOfBirth(),
  studentValidation.contactNumber(),
  activeStatus(optional),

  // handle validation errors
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;
    return res.status(statusCode).json(
      new FailureResponse(statusCode, "Form validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },

  // handle creation
  async (req, res) => {
    const user = assertUserInRequest(req);
    const {
      firstName,
      lastName,
      parentName,
      contactNumber,
      aadhaarNumber,
      dateOfBirth,
    } = req.body;

    const inputs: StudentCreateInput = {
      firstName,
      lastName,
      parentName,
      contactNumber,
      aadhaarNumber,
      dateOfBirth,
    };

    const student = await studentModel.create(user.role, inputs);

    return res.json(
      new SuccessResponse("Student registered successfully.", { student }),
    );
  },
];
