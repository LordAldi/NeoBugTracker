import express from "express";
import cors from "cors";
import "express-async-errors"; //IMPORTANT
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/auth/current-user";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";
import { signupRouter } from "./routes/auth/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { currentUser } from "./middlewares/current-user";
import { newProjectRouter } from "./routes/projects/new";
import { getProjectRouter } from "./routes/projects/get";
import { getOneProjectRouter } from "./routes/projects/getOne";

const app = express();
app.use(cors());

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    httpOnly: false,
    sameSite: false,
    secure: process.env.NODE_ENV === "production",
  })
);
app.use(currentUser);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(newProjectRouter);
app.use(getProjectRouter);
app.use(getOneProjectRouter);
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
