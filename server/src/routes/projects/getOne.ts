import express, { Response } from "express";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { NotFoundError } from "../../errors/not-found-error";
import { requireAuth } from "../../middlewares/require-auth";
import { Project } from "../../models/project";
import { ac } from "../../services/accessControl";
import { Content } from "../../services/enums";
import { Params, Query, Request } from "../../types/types";

const router = express.Router();

router.get(
  "/api/projects/:id",
  requireAuth,
  async (req: Request<RequestBody, Query, Params>, res: Response) => {
    const permissionAny = ac
      .can(req.currentUser?.role)
      .readAny(Content.project);

    const permissionOwn = ac
      .can(req.currentUser?.role)
      .readOwn(Content.project);
    let params;
    if (permissionAny.granted) {
      params = {
        _id: req.params.id,
      };
    } else if (permissionOwn.granted) {
      params = {
        _id: req.params.id,
        assignedTo: { _id: req.currentUser.id },
      };
    } else {
      throw new NotAuthorizedError();
    }

    const project = await Project.findOne(params)
      .populate({
        path: "assignedTo",
        populate: { path: "assignedTo" },
        model: "User",
      })
      .populate("createdBy")
      .populate("modifiedBy");

    if (!project) {
      throw new NotFoundError();
    }

    res.send(project);
  }
);

export { router as getOneProjectRouter };

interface RequestBody {}
