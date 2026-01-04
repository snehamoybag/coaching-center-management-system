import { Router } from "express";
import * as signupController from "../../../controllers/signup.controller";
import signAuthToken from "../../../middlewares/auth/sign-auth-token.middleware";

const signupRouter = Router();

signupRouter.post(
  "/",
  signupController.handleValidations,
  signupController.createUser,
  signAuthToken,
  signupController.handleSuccess,
);

export default signupRouter;
