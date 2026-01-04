import { Router } from "express";
import * as studentsController from "../../controllers/students.controller";
import adminOnly from "../../middlewares/auth/admin-only.middleware";

const studentsRouter = Router();

studentsRouter.post("/", adminOnly, studentsController.registerStudent);

export default studentsRouter;
