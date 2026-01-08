import { RequestHandler } from "express";
import * as batchValidation from "../validations/batch.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import * as batchModel from "../models/batch.model";
import {
  getNormalizedLimit,
  getNormalizedOffset,
  getOrder,
} from "../libs/format-url-queries";
import { ErrorNotFound } from "../libs/http-exceptions";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";

const optional = true;

const handleValidationErrors: RequestHandler = (req, res, next) => {
  const validationsErrors = validationResult(req);

  if (validationsErrors.isEmpty()) {
    return next();
  }

  const statusCode = 400;
  return res.json(
    new FailureResponse(statusCode, "Form validation failed.", {
      errors: validationsErrors.mapped(),
    }),
  );
};

export const create: RequestHandler[] = [
  batchValidation.name(),
  batchValidation.studentIds(optional),
  batchValidation.teacherIds(optional),

  // handle validation errors
  handleValidationErrors,

  // handle creation
  async (req, res) => {
    const { name, teacherIds, studentIds } = req.body;

    const batch = await batchModel.create({ name, teacherIds, studentIds });

    return res.json(
      new SuccessResponse("Batch created successfully.", { batch }),
    );
  },
];

export const getMany: RequestHandler = async (req, res) => {
  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const batches = await batchModel.findMany(limit, offset, order);

  return res.json(new SuccessResponse("List of batches.", { batches }));
};

export const getById: RequestHandler = async (req, res) => {
  const batchId = req.params.id;
  const batch = await batchModel.findById(batchId);

  if (!batch) {
    throw new ErrorNotFound(`Batch with the id '${batchId} is not found.'`);
  }

  return res.json(
    new SuccessResponse(`Batch with the id ${batchId}.`, { batch }),
  );
};

export const getStudents: RequestHandler = async (req, res) => {
  const user = assertUserInRequest(req);

  const batchId = req.params.id;
  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const students = await batchModel.studentsInBatchWithId(
    user.role,
    batchId,
    limit,
    offset,
    order,
  );

  if (!students) {
    throw new ErrorNotFound(`Batch with the id '${batchId}' is not found.`);
  }

  return res.json(
    new SuccessResponse(
      `List of students in the batch with the id '${batchId}'.`,
      { students },
    ),
  );
};

export const getTeachers: RequestHandler = async (req, res) => {
  const user = assertUserInRequest(req);

  const batchId = req.params.id;
  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const teachers = await batchModel.teachersInBatchWithId(
    user.role,
    batchId,
    limit,
    offset,
    order,
  );

  if (!teachers) {
    throw new ErrorNotFound(`Batch with the id '${batchId}' is not found.`);
  }

  return res.json(
    new SuccessResponse(
      `List of teachers in the batch with the id '${batchId}'.`,
      { students: teachers },
    ),
  );
};
