import express from "express";
import { home, search } from '../controllers/videoContrillers';
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControllers";
import { publicMiddleware } from '../middlewares';
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").all(publicMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicMiddleware).get(getLogin).post(postLogin);

export default rootRouter;