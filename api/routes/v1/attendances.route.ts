import { Router } from "express";
import validAttendacneOnly from "../../middlewares/valid-attendance-only.middleware";
import * as attendancesController from "../../controllers/attendances.controller";

const attendancesRouter = Router();

// /attendances/:id
attendancesRouter.get("/:id", attendancesController.getById);
attendancesRouter.put(
  "/:id",
  validAttendacneOnly,
  attendancesController.update,
);

export default attendancesRouter;
