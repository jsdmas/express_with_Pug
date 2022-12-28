import express from "express";
import { trending } from '../controllers/videoContrillers';

const globalRouter = express.Router();

globalRouter.get("/", trending);

export default globalRouter;