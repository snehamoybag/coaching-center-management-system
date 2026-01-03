import { RequestHandler } from "express";
import assertUserInRequest from "../../libs/asserts/user-in-request.assert";
import assertAuthTokenKey from "../../libs/asserts/auth-token-key.assert";
import jwt, { type SignOptions } from "jsonwebtoken";

// MUST BE CALLED AFTER AUTHENTICATING USER
const signAuthToken: RequestHandler = (req, res, next) => {
  const user = assertUserInRequest(req);
  const AUTH_TOKEN_KEY = assertAuthTokenKey();

  const payload = {
    id: user.id,
    role: user.role,
  };

  const jwtOptions: SignOptions = {
    expiresIn: "7d",
  };

  jwt.sign(payload, AUTH_TOKEN_KEY, jwtOptions, (err, token) => {
    if (err) {
      return next(err);
    }

    if (!token) {
      return next(new Error("Failed to generate auth token."));
    }

    res.locals.token = token;
    next();
  });
};

export default signAuthToken;
