import { Router } from "express";
import { getStats } from "../../controllers/stats.controller";

const statsRouter = Router();

// /stats
statsRouter.get("/", getStats);

export default statsRouter;
