import { Router } from "express";
import adminOnly from "../../middlewares/auth/admin-only.middleware";
import * as usersController from "../../controllers/users.controller";
import validUserOnly from "../../middlewares/valid-user-only.middleware";

const teachersRouter = Router();

// / teachers
teachersRouter.get("/", usersController.getManyTeachers);
teachersRouter.post("/", adminOnly, usersController.create);

// / teachers/:id
teachersRouter.get("/:id", usersController.getTeacherById);
teachersRouter.put("/:id", adminOnly, validUserOnly, usersController.update);

export default teachersRouter;
