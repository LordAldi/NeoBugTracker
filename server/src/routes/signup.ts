import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";

import { User, validateUser } from "../models/user";
// import { validateRequest, BadRequestError } from "@anuisme/common-ticket";
require("dotenv").config();

const router = express.Router();

router.post("/api/users/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email Already in Use");
  }

  const { error } = validateUser(req.body);
  if (error) {
    throw new RequestValidationError(error.details);
  }

  const user = User.build({ email, password, role: "none" });
  await user.save();

  //generateJWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );
  //Store in session
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(user);
});

export { router as signupRouter };
