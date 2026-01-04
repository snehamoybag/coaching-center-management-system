import { Router } from "express";
import authenticateUser from "../../../middlewares/auth/authenticate-user.middleware";
import signAuthToken from "../../../middlewares/auth/sign-auth-token.middleware";
import { handleSuccessfulAuthentication } from "../../../controllers/login.controller";

const loginRouter = Router();

// /auth/login
loginRouter.post(
  "/",
  authenticateUser,
  signAuthToken,
  handleSuccessfulAuthentication,
);

export default loginRouter;
