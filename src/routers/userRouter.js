import express from "express";

import { finishGithubLogin, logout, startGithubLogin } from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logout);

export default userRouter;