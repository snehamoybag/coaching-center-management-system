import { RequestHandler, Request } from "express";
import { activeStatus, name } from "../validations/user.validation";
import * as studentValidation from "../validations/student.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import * as studentModel from "../models/student.model";
import {
  StudentCreateInput,
  StudentUpdateInput,
} from "../generated/prisma/models";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";
import {
  getNormalizedLimit,
  getNormalizedOffset,
  getOrder,
} from "../libs/format-url-queries";
import { ErrorNotFound } from "../libs/http-exceptions";

const optional = true;

const handleFormValidationErrors = (): RequestHandler => {
  return (req, res, next) => {
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
  };
};

const getStudentInputs = (req: Request) => {
  const {
    firstName,
    lastName,
    parentName,
    contactNumber,
    aadhaarNumber,
    dateOfBirth,
  } = req.body;

  const input = {
    firstName,
    lastName,
    parentName,
    contactNumber,
    aadhaarNumber,
    dateOfBirth,
  };

  return input;
};

export const register: RequestHandler[] = [
  name("firstName"),
  name("lastName"),
  studentValidation.aadhaarNumber(),
  studentValidation.parentName(),
  studentValidation.dateOfBirth(),
  studentValidation.contactNumber(),
  activeStatus(optional),

  // handle validation errors
  handleFormValidationErrors(),

  // handle creation
  async (req, res) => {
    const createInputs: StudentCreateInput = getStudentInputs(req);

    const student = await studentModel.create(createInputs);

    return res.json(
      new SuccessResponse("Student registered successfully.", { student }),
    );
  },
];

export const update: RequestHandler[] = [
  name("firstName", optional),
  name("lastName", optional),
  studentValidation.aadhaarNumber(optional),
  studentValidation.parentName(optional),
  studentValidation.dateOfBirth(optional),
  studentValidation.contactNumber(optional),
  activeStatus(optional),

  handleFormValidationErrors(),

  // handle update
  async (req, res) => {
    const studentId = req.params.id;
    const updateInputs: StudentUpdateInput = getStudentInputs(req);
    const student = await studentModel.update(studentId, updateInputs);

    return res.json(
      new SuccessResponse("Student info updated successfully.", { student }),
    );
  },
];

export const getMany: RequestHandler = async (req, res) => {
  const user = assertUserInRequest(req);
  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const students = await studentModel.findMany(user.role, limit, offset, order);

  return res.json(new SuccessResponse("List of students.", { students }));
};

export const getById: RequestHandler = async (req, res) => {
  const user = assertUserInRequest(req);
  const studentId = req.params.id;
  const student = await studentModel.findById(user.role, studentId);

  if (!student) {
    throw new ErrorNotFound(`Student with the id '${studentId}' is not found.`);
  }

  return res.json(
    new SuccessResponse(`Details of student with the id '${studentId}'.`, {
      student,
    }),
  );
};
