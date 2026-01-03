import { Response } from "express";

const assertAuthTokenInResponse = (res: Response) => {
  const authToken = res.locals.token;

  if (!authToken) {
    throw new Error("Authentication token not found in response.");
  }

  if (typeof authToken !== "string") {
    throw new Error(
      `Expecting a string token but recieved ${typeof authToken}.`,
    );
  }

  return authToken;
};

export default assertAuthTokenInResponse;
