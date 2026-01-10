import { Router } from "express";
import adminOnly from "../../middlewares/auth/admin-only.middleware";
import * as feesController from "../../controllers/fees.controller";
import validFeeOnly from "../../middlewares/valid-fee-only.middleware";

const feesRouter = Router();

// /fees
feesRouter.all("/{*splat}", adminOnly);

feesRouter.get("/", feesController.getMany);
feesRouter.post("/", feesController.create);

// /fees/:id
feesRouter.get("/:id", feesController.getById);
feesRouter.put("/:id", validFeeOnly, feesController.update);
feesRouter.delete("/:id", validFeeOnly, feesController.deleteOne);

export default feesRouter;
