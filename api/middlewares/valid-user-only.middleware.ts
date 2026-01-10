import { RequestHandler } from "express";
import { findById as findUserById } from "../models/user.model";
import { ErrorNotFound } from "../libs/http-exceptions";

const validUserOnly: RequestHandler = async (req, _res, next) => {
  const userId = req.params.id;

  const user = await findUserById(userId);

  if (!user) {
    throw new ErrorNotFound(`User with the id '${userId}' is not found.`);
  }

  return next();
};

export default validUserOnly;
