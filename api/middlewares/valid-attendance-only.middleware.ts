import { RequestHandler } from "express";
import { findById as findAttendanceById } from "../models/attendance.model";
import { ErrorNotFound } from "../libs/http-exceptions";

const validAttendacneOnly: RequestHandler = async (req, _res, next) => {
  const attendanceId = req.params.id;
  const attendance = await findAttendanceById(attendanceId);

  if (!attendance) {
    throw new ErrorNotFound(
      `Attendance record with the id '${attendanceId}' is not found.`,
    );
  }

  return next();
};

export default validAttendacneOnly;
