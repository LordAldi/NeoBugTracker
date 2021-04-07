import express from "express";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { NotFoundError } from "../../errors/not-found-error";
import { RequestValidationError } from "../../errors/request-validation-error";
import { requireAuth } from "../../middlewares/require-auth";
import { Project, validateProject } from "../../models/project";
import { ac } from "../../services/accessControl";
import { Content } from "../../services/enums";
import { Params, Query, Request } from "../../types/types";

const router = express.Router();
router.put(
  "/api/projects/:id",
  requireAuth,
  async (
    req: Request<RequestBody, RequestQuery, RequestParams>,
    res: express.Response
  ) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw new NotFoundError();
    }
    const assigned = project.assignedTo.find(
      (id: string) => id == req.currentUser?.id
    );
    const permissionAny = ac
      .can(req.currentUser?.role)
      .updateAny(Content.project);

    const permissionOwn = ac
      .can(req.currentUser?.role)
      .updateOwn(Content.project);
    if (permissionAny.granted || (permissionOwn.granted && assigned)) {
      const { name, description } = req.body;
      const { error } = validateProject(req.body);
      project.set({
        name,
        description,
        modifiedBy: req.currentUser?.id!,
      });
      await project.save();
      res.send(project);
    } else {
      throw new NotAuthorizedError();
    }
  }
);

export { router as updateProjectRouter };
interface RequestBody {
  name?: string;
  description?: string;
}

interface RequestQuery extends Query {}

interface RequestParams extends Params {}
