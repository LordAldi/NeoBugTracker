import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/bad-request-error";
import { RequestValidationError } from "../../errors/request-validation-error";
import { User, validateUpdateUser } from "../../models/user";
import { PasswordManager } from "../../services/passwordManager";
require("dotenv").config();

const router = express.Router();

router.post("/api/users/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }
  const passwordsMatch = await PasswordManager.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  const { error } = validateUpdateUser(req.body);
  if (error) {
    throw new RequestValidationError(error.details);
  }

  //generateJWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_KEY!
  );
  //Store in session
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existingUser);
});

export { router as signinRouter };
