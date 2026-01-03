import { Router } from "express";
import authenticateUser from "../../../middlewares/auth/authenticate-user.middleware";
import signAuthToken from "../../../middlewares/auth/sign-auth-token.middleware";

const loginRouter = Router();

// /auth/login
loginRouter.post("/", authenticateUser, signAuthToken);

export default loginRouter;
