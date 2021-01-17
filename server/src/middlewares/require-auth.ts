import { Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { Params, Query, Request } from "../types/types";

export const requireAuth = (
  req: Request<RequestBody, RequestQuery, RequestParams>,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};

interface RequestBody {}

interface RequestQuery extends Query {}

interface RequestParams extends Params {}
