import { Router } from "express";
import * as studentsController from "../../controllers/students.controller";
import adminOnly from "../../middlewares/auth/admin-only.middleware";
import validStudentOnly from "../../middlewares/valid-student-only.middleware";

const studentsRouter = Router();

// /students
studentsRouter.get("/", studentsController.getMany);
studentsRouter.post("/", adminOnly, studentsController.register);

// /students/:id
studentsRouter.get("/:id", studentsController.getById);
studentsRouter.put(
  "/:id",
  adminOnly,
  validStudentOnly,
  studentsController.update,
);

export default studentsRouter;
