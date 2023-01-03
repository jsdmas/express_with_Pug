import express from "express";
import { home, search } from '../controllers/videoContrillers';

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/search", search);

export default globalRouter;