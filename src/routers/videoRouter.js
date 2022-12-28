import express from "express";
import { getEdit, postEdit, see } from '../controllers/videoContrillers';

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;