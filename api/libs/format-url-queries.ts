import { Request } from "express";
import { Order } from "../types/order-type";

// Make limit not more than 200
// Limit is 100 if no query is present
export const getNormalizedLimit = (req: Request): number => {
  const BASE_LIMIT = 100;
  const MAX_LIMIT = 200;

  const queryLimit = Number(req.query.limit) || BASE_LIMIT;

  if (queryLimit > MAX_LIMIT || queryLimit < 1) {
    return BASE_LIMIT;
  }

  return queryLimit;
};

// Make offset not less than 0
export const getNormalizedOffset = (req: Request) => {
  const queryOffset = Number(req.query.offset) || 0;

  if (queryOffset < 0) {
    return 0;
  }

  return queryOffset;
};

// descending order by default
export const getOrder = (req: Request): Order => {
  const queryOrder = req.query.order;
  if (!queryOrder || typeof queryOrder !== "string") {
    return "desc";
  }

  const supportedAscendingKeywords = ["oldest", "asc", "ascending"];

  if (supportedAscendingKeywords.includes(queryOrder.toLowerCase())) {
    return "asc";
  }

  return "desc";
};
