import { RequestHandler } from "express";
import * as statsModel from "../models/stats.model";
import { SuccessResponse } from "../libs/http-response-shapes";

export const getStats: RequestHandler = async (req, res) => {
  const stats = await statsModel.getAll();

  return res.json(new SuccessResponse("Center stats.", { stats }));
};
