import { Router } from "express";
import adminOnly from "../../middlewares/auth/admin-only.middleware";
import * as paymentController from "../../controllers/payment.controller";

const paymentRouter = Router();

// /payments
paymentRouter.all("/{*splat}", adminOnly);

paymentRouter.get("/", paymentController.getMany);
paymentRouter.post("/", paymentController.create);

// /payments/:id
paymentRouter.get("/:id", paymentController.getById);

export default paymentRouter;
