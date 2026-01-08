import { Router } from "express";
import adminOnly from "../../middlewares/auth/admin-only.middleware";
import * as batchesController from "../../controllers/batches.controller";

const batchesRouter = Router();

// /batches
batchesRouter.get("/", batchesController.getMany);
batchesRouter.post("/", adminOnly, batchesController.create);

// /batches/:id
batchesRouter.get("/:id", batchesController.getById);
batchesRouter.get("/:id/students", batchesController.getStudents);
batchesRouter.get("/:id/teachers", batchesController.getTeachers);

export default batchesRouter;
