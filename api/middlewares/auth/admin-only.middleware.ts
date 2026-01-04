import { RequestHandler } from "express";
import assertUserInRequest from "../../libs/asserts/user-in-request.assert";
import { ErrorForbidden } from "../../libs/http-exceptions";

const adminOnly: RequestHandler = (req, _res, next) => {
  const user = assertUserInRequest(req);

  if (user.role !== "ADMIN") {
    throw new ErrorForbidden("Only an admin can access this resource.");
  }

  next();
};

export default adminOnly;
