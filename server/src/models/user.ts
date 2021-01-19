import mongoose from "mongoose";
import { PasswordManager } from "../services/passwordManager";
import Joi from "joi";
import { Role } from "../services/enums";

// An Interface that describes the properties
//that required to create new User
interface UserAttrs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

//an interface taht describe the properties
//that user model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//an interface that describes the properties
//that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  //   updatedAt:string
}
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        Role.none,
        Role.submitter,
        Role.developer,
        Role.projectManager,
        Role.admin,
      ],
      default: Role.none,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

//build User for typescript with mongoose so typescipt can check the type
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
const validateUser = (user: Object) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid(
      Role.none,
      Role.submitter,
      Role.developer,
      Role.projectManager,
      Role.admin
    ).required,
  });

  return schema.validate(user);
};
const validateUpdateUser = (user: Object) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8),
    role: Joi.string().valid(
      Role.none,
      Role.submitter,
      Role.developer,
      Role.projectManager,
      Role.admin
    ),
  });

  return schema.validate(user);
};

export {
  User,
  validateUser,
  validateUpdateUser,
  userSchema,
  UserDoc,
  UserAttrs,
};
