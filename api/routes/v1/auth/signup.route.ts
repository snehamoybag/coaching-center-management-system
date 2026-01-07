import { Router } from "express";
import * as signupController from "../../../controllers/signup.controller";
import signAuthToken from "../../../middlewares/auth/sign-auth-token.middleware";
import adminOnly from "../../../middlewares/auth/admin-only.middleware";

const signupRouter = Router();

signupRouter.post(
  "/",
  adminOnly,
  signupController.handleValidations,
  signupController.createUser,
  signAuthToken,
  signupController.handleSuccess,
);

export default signupRouter;
