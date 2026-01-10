import { RequestHandler } from "express";
import * as userValidation from "../validations/user.validation";
import * as userModel from "../models/user.model";
import handleFormValidationErrors from "../middlewares/handle-form-validation-errors.middleware";
import bcrypt from "bcryptjs";
import { UserCreateInput } from "../types/user-create-input.type";
import { SuccessResponse } from "../libs/http-response-shapes";
import {
  getNormalizedLimit,
  getNormalizedOffset,
  getOrder,
} from "../libs/format-url-queries";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";
import { ErrorNotFound } from "../libs/http-exceptions";
import { UserUpdateInput } from "../types/user-update-input.type";

const optional = true;

export const create: RequestHandler[] = [
  userValidation.name("firstName"),
  userValidation.name("lastName"),
  userValidation.email(),
  userValidation.newEmail(),
  userValidation.password(),
  userValidation.aadhaarNumber(),
  userValidation.contactNumber(),
  userValidation.batchIds("batchIds", optional),

  handleFormValidationErrors,

  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      aadhaarNumber,
      contactNumber,
      batchIds,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const input: UserCreateInput = {
      firstName,
      lastName,
      email,
      passwordHash,
      contactNumber,
      aadhaarNumber,
      role: "TEACHER",
      status: "ACTIVE",
      batchIds,
    };

    const user = await userModel.create(input);

    return res.json(
      new SuccessResponse("User created successfully.", { user }),
    );
  },
];

export const update: RequestHandler[] = [
  userValidation.name("firstName", optional),
  userValidation.name("lastName", optional),
  userValidation.email(optional),
  userValidation.newEmail(),
  userValidation.password(optional),
  userValidation.aadhaarNumber(optional),
  userValidation.contactNumber(optional),
  userValidation.batchIds("addedBatchIds", optional),
  userValidation.batchIds("removedBatchIds", optional),

  handleFormValidationErrors,

  async (req, res) => {
    const id = req.params.id;

    const {
      firstName,
      lastName,
      email,
      password,
      aadhaarNumber,
      contactNumber,
      addedBatchIds,
      removedBatchIds,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const input: UserUpdateInput = {
      firstName,
      lastName,
      email,
      passwordHash,
      contactNumber,
      aadhaarNumber,
      role: "TEACHER",
      status: "ACTIVE",
      addedBatchIds,
      removedBatchIds,
    };

    const user = await userModel.update(id, input);

    return res.json(
      new SuccessResponse("User details updated successfully.", { user }),
    );
  },
];

export const getManyTeachers: RequestHandler = async (req, res) => {
  const user = assertUserInRequest(req);

  const limit = getNormalizedLimit(req);
  const offset = getNormalizedOffset(req);
  const order = getOrder(req);

  const teachers = await userModel.findManyTeachers(
    user.role,
    limit,
    offset,
    order,
  );

  res.json(new SuccessResponse("List of teachers.", { teachers }));
};

export const getTeacherById: RequestHandler = async (req, res) => {
  const user = assertUserInRequest(req);
  const teacherId = req.params.id;

  const teacher = await userModel.findTeacherById(user.role, teacherId);

  if (!teacher) {
    throw new ErrorNotFound(`Teacher with the id '${teacherId}' is not found.`);
  }

  return res.json(
    new SuccessResponse(`Teacher with the id '${teacherId}'.`, { teacher }),
  );
};
