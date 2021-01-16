import express, { Request, Response } from "express";
import { Project } from "../../models/project";
import { User } from "../../models/user";

const router = express.Router();

router.get("/api/projects", async (req: Request, res: Response) => {
  // const { pageNumber, pageSize } = req.query;

  const project = await Project.find({})
    // .skip((pn - 1) * ps)
    .populate({
      path: "assignedTo",
      populate: { path: "assignedTo" },
      model: "User",
    })
    .populate("createdBy");

  res.send(project);
});
interface RequestQuery {
  pageNumber: number;
  pageSize: number;
}
export { router as getProjectRouter };
