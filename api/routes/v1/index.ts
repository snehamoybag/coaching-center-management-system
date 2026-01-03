import { Router } from "express";
import { SuccessResponse } from "../../libs/http-response-shapes";

const router = Router();

router.get("/", (_req, res) => {
  res.json(
    new SuccessResponse("Connected to API - Coaching Center (v1)", {
      name: "API - Coaching Center (v1)",
      version: "1.0.0",
    }),
  );
});

// use this route to verify if the issued JWT is still valid
// router.post("/", verifyAuthToken, (_req, res) => {
//   res.json(
//     new SuccessResponse("Connected to API - Coaching Center (v1)", {
//       name: "API - Coaching Center (v1)",
//       version: "1.0.0",
//     }),
//   );
// });

export default router;
