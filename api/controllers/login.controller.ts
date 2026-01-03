import { RequestHandler } from "express";
import assertUserInRequest from "../libs/asserts/user-in-request.assert";
import assertAuthTokenInResponse from "../libs/asserts/auth-token-in-response.assert";
import { SuccessResponse } from "../libs/http-response-shapes";

export const handleSuccessfulAuthentication: RequestHandler = (req, res) => {
  const user = assertUserInRequest(req);
  const token = assertAuthTokenInResponse(res);

  res.json(
    new SuccessResponse(
      "Login Successful. Use this token in the Authorization header as a Bearer token to authenticate future requests.",
      { user, token },
    ),
  );
};
