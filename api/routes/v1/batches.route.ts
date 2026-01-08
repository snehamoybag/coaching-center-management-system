import { Router } from "express";
import adminOnly from "../../middlewares/auth/admin-only.middleware";
import * as batchesController from "../../controllers/batches.controller";
import validBatchOnly from "../../middlewares/valid-batch-only.middleware";

const batchesRouter = Router();

// /batches
batchesRouter.get("/", batchesController.getMany);
batchesRouter.post("/", adminOnly, batchesController.create);

// /batches/:id
batchesRouter.get("/:id", batchesController.getById);
batchesRouter.put("/:id", adminOnly, validBatchOnly, batchesController.update);

// /batches/:id/students
batchesRouter.get("/:id/students", batchesController.getStudents);

// /batches/:id/teachers
batchesRouter.get("/:id/teachers", batchesController.getTeachers);

export default batchesRouter;
