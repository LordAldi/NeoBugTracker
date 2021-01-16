import express, { Request, Response } from "express";
import { RequestValidationError } from "../../errors/request-validation-error";
import { currentUser } from "../../middlewares/current-user";
import { requireAuth } from "../../middlewares/require-auth";
import { Project, validateProject } from "../../models/project";

const router = express.Router();
router.post(
  "/api/projects",
  requireAuth,
  async (req: Request, res: Response) => {
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
  }
);

export { router as newProjectRouter };
