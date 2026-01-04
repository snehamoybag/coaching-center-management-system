import { Router } from "express";
import { SuccessResponse } from "../../libs/http-response-shapes";
import verifyAuthToken from "../../middlewares/auth/verify-auth-token.auth";
import signupRouter from "./auth/signup.route";
import loginRouter from "./auth/login.route";

const router = Router();

router.get("/", (_req, res) => {
  res.json(
    new SuccessResponse("Connected to API - Coaching Center (v1)", {
      name: "API - Coaching Center (v1)",
      version: "1.0.0",
    }),
  );
});

// use this route to check if the issued auth token is still valid
router.post("/", verifyAuthToken, (_req, res) => {
  res.json(
    new SuccessResponse("Connected to API - Coaching Center (v1)", {
      name: "API - Coaching Center (v1)",
      version: "1.0.0",
    }),
  );
});

router.use("/signup", signupRouter);
router.use("/login", loginRouter);

export default router;
