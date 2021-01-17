import express from "express";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { requireAuth } from "../../middlewares/require-auth";
import { Project } from "../../models/project";
import { ac } from "../../services/accessControl";
import { Content } from "../../services/enums";
import { Params, Query, Request } from "../../types/types";
const router = express.Router();

router.get(
  "/api/projects",
  requireAuth,
  async (
    req: Request<RequestBody, RequestQuery, RequestParams>,
    res: express.Response
  ) => {
    const permissionAny = ac
      .can(req.currentUser?.role)
      .readAny(Content.project);

    const permissionOwn = ac
      .can(req.currentUser?.role)
      .readOwn(Content.project);

    const { page, limit } = req.query;
    let pn = parseInt(page) || 1;
    let ps = parseInt(limit) || 10;
    if (!pn) pn = 1;
    if (!ps) ps = 10;

    if (permissionAny.granted) {
      const project = await Project.find({})
        .skip((pn - 1) * ps)
        .populate({
          path: "assignedTo",
          populate: { path: "assignedTo" },
          model: "User",
        })
        .populate("createdBy")
        .populate("modifiedBy");

      res.status(201).send(project);
    } else if (permissionOwn.granted) {
      const project = await Project.find({
        assignedTo: { _id: req.currentUser?.id },
      })
        .skip((pn - 1) * ps)
        .populate({
          path: "assignedTo",
          populate: { path: "assignedTo" },
          model: "User",
        })
        .populate("createdBy")
        .populate("modifiedBy");
      res.status(201).send(project);
    } else {
      throw new NotAuthorizedError();
    }
  }
);

export { router as getProjectRouter };
interface RequestBody {}

interface RequestQuery extends Query {
  page: string;
  limit: string;
}

interface RequestParams extends Params {}
