import { RequestHandler } from "express";
import { findById as findStudentById } from "../models/student.model";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";
import { ErrorNotFound } from "../libs/http-exceptions";

const validStudentOnly: RequestHandler = async (req, res, next) => {
  const user = assertUserInRequest(req);
  const studentId = req.params.id;

  const student = await findStudentById(user.role, studentId);

  if (!student) {
    throw new ErrorNotFound(`Student with the id '${studentId}' is not found.`);
  }

  next();
};
export default validStudentOnly;
