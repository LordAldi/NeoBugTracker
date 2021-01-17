import express from "express";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { RequestValidationError } from "../../errors/request-validation-error";
import { requireAuth } from "../../middlewares/require-auth";
import { Project, validateProject } from "../../models/project";
import { ac } from "../../services/accessControl";
import { Content } from "../../services/enums";
import { Params, Query, Request } from "../../types/types";

const router = express.Router();
router.post(
  "/api/projects",
  requireAuth,
  async (
    req: Request<RequestBody, RequestQuery, RequestParams>,
    res: express.Response
  ) => {
    const permission = ac.can(req.currentUser?.role).createOwn(Content.project);
    if (permission.granted) {
      const { name, description } = req.body;
      const { error } = validateProject(req.body);
      if (error) throw new RequestValidationError(error.details);
      const project = Project.build({
        name,
        description,
        assignedTo: [req.currentUser?.id!],
        createdBy: req.currentUser?.id!,
        modifiedBy: req.currentUser?.id!,
      });
      await project.save();
      res.status(201).send(project);
    } else {
      throw new NotAuthorizedError();
    }
  }
);

export { router as newProjectRouter };
interface RequestBody {
  name: string;
  description: string;
}

interface RequestQuery extends Query {}

interface RequestParams extends Params {}
