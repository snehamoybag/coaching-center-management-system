import { RequestHandler } from "express";
import {
  getNormalizedLimit,
  getNormalizedOffset,
  getOrder,
} from "../libs/format-url-queries";
import * as attendanceModel from "../models/attendance.model";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import { studentIds as validateStudentIds } from "../validations/batch.validation";
import { validationResult } from "express-validator";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";
import { ErrorNotFound } from "../libs/http-exceptions";

const optional = true;

const handleFormValidatinErrors: RequestHandler = (req, res, next) => {
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

export const getManyInBatch: RequestHandler = async (req, res) => {
  const batchId = req.params.id;
  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const attendances = await attendanceModel.findMany(
    batchId,
    limit,
    offset,
    order,
  );

  return res.json(
    new SuccessResponse(
      `List of attendances in the batch with the id '${batchId}'.`,
      { attendances },
    ),
  );
};

export const getById: RequestHandler = async (req, res) => {
  const attendanceId = req.params.id;
  const attendance = await attendanceModel.findById(attendanceId);

  if (!attendanceId) {
    throw new ErrorNotFound(
      `Attendance record with the id '${attendanceId}' is not found.`,
    );
  }

  return res.json(
    new SuccessResponse(`Attendance record with the id '${attendanceId}'.`, {
      attendance,
    }),
  );
};

export const create: RequestHandler[] = [
  validateStudentIds("presentStudentIds", optional),

  // handle validation
  handleFormValidatinErrors,

  // handle creation
  async (req, res) => {
    const user = assertUserInRequest(req);
    const batchId = req.params.id;
    const presentStudentIds = req.body.presentStudentIds;

    const attendance = await attendanceModel.create(
      user.id,
      batchId,
      presentStudentIds,
    );

    return res.json(
      new SuccessResponse("Attendance record created successfully.", {
        attendance,
      }),
    );
  },
];

export const update: RequestHandler[] = [
  validateStudentIds("addedStudentIds", optional),
  validateStudentIds("removedStudentIds", optional),

  // handle validation
  handleFormValidatinErrors,

  // handle creation
  async (req, res) => {
    const attendanceId = req.params.id;
    const { addedStudentIds, removedStudentIds } = req.body;

    const attendance = await attendanceModel.update(
      attendanceId,
      addedStudentIds,
      removedStudentIds,
    );

    return res.json(
      new SuccessResponse(
        `Attendance record with the id '${attendanceId}' has been successfully updated.`,
        {
          attendance,
        },
      ),
    );
  },
];
