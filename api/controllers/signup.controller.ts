import { RequestHandler } from "express";
import * as userValidation from "../validations/user.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import bcrypt from "bcryptjs";
import { create as createNewUser } from "../models/user.model";
import assertAuthTokenInResponse from "../libs/asserts/auth-token-in-response.assert";
import { UserCreateInput } from "../generated/prisma/models";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";

export const handleValidations: RequestHandler[] = [
  userValidation.name("firstName"),
  userValidation.name("lastName"),
  userValidation.email(),
  userValidation.newEmail(),
  userValidation.password(),
  userValidation.contactNumber(),
  userValidation.activeStatus(true),

  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;
    res.status(statusCode).json(
      new FailureResponse(statusCode, "Form validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },
];

// CALL IT AFTER VALIDATING THE FORM
export const createUser: RequestHandler = async (req, _res, next) => {
  const { firstName, lastName, email, password, contactNumber, activeStatus } =
    req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const inputs: UserCreateInput = {
    firstName,
    lastName,
    email,
    passwordHash,
    contactNumber,
    status: activeStatus || "ACTIVE",
    role: "TEACHER",
  };
  const user = await createNewUser(inputs);

  req.user = user;
  return next();
};

// CALL IT AFTER SIGNING AUTH TOKEN
export const handleSuccess: RequestHandler = (req, res) => {
  const newUser = assertUserInRequest(req);
  const authToken = assertAuthTokenInResponse(res);

  return res.json(
    new SuccessResponse(
      "Signup Successful. Use this token in the Authorization header as a Bearer token to authenticate future requests.",
      { user: newUser, token: authToken },
    ),
  );
};
