import express from "express";

import { finishGithubLogin, getChangePassword, getEdit, logout, postChangePassword, postEdit, startGithubLogin } from '../controllers/userControllers';
import { protectorMiddleware, publicMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start", publicMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

export default userRouter;