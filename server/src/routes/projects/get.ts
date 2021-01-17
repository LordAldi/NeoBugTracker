import express from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { Project } from "../../models/project";
import { User } from "../../models/user";
import { Params, Query, Request } from "../../types/types";
const router = express.Router();

router.get(
  "/api/projects",
  requireAuth,
  async (
    req: Request<RequestBody, RequestQuery, RequestParams>,
    res: express.Response
  ) => {
    const { page, limit } = req.query;
    let pn = parseInt(page) || 1;
    let ps = parseInt(limit) || 10;
    if (!pn) pn = 1;
    if (!ps) ps = 10;
    const project = await Project.find({})
      .skip((pn - 1) * ps)
      .populate({
        path: "assignedTo",
        populate: { path: "assignedTo" },
        model: "User",
      })
      .populate("createdBy")
      .populate("modifiedBy");

    res.send(project);
  }
);

export { router as getProjectRouter };
interface RequestBody {}

interface RequestQuery extends Query {
  page: string;
  limit: string;
}

interface RequestParams extends Params {}
