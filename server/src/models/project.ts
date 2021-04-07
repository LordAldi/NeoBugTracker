import mongoose from "mongoose";
import { PasswordManager } from "../services/passwordManager";
import Joi, { string } from "joi";
import { userSchema, UserDoc } from "./user";
// An Interface that describes the properties
//that required to create new Project
interface ProjectAttrs {
  name: string;
  description: string;
  assignedTo: any;
  createdBy: string;
  modifiedBy: string;
}

//an interface taht describe the properties
//that project model has

interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(attrs: ProjectAttrs): ProjectDoc;
}

//an interface that describes the properties
//that a project document has
interface ProjectDoc extends mongoose.Document {
  name: string;
  description: string;
  assignedTo: any[];
  tickets: string[];
  created: number;
  createdBy: string;
  modified: number;
  modifiedBy: string;
  isFinish: boolean;
}
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "Description",
    },
    assignedTo: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    created: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modified: { type: Date, default: Date.now },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isFinish: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

//build Project for typescript with mongoose so typescipt can check the type
projectSchema.statics.build = (attrs: ProjectAttrs) => {
  return new Project(attrs);
};

const Project = mongoose.model<ProjectDoc, ProjectModel>(
  "Project",
  projectSchema
);
const validateProject = (project: Object) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string(),
  });

  return schema.validate(project);
};
const validateUpdateProject = (project: Object) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string(),
    assignedTo: Joi.array().items(Joi.string()),
    tickets: Joi.array().items(Joi.string()),
    modifiedBy: Joi.string().required(),
    isFinish: Joi.bool(),
  });
  return schema.validate(project);
};

export { Project, validateProject, validateUpdateProject };
