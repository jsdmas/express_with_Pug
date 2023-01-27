import express from "express";
import { registerView } from "../controllers/videoContrillers";

const apiRouter = express.Router();

apiRouter.post(`/videos/:id/:views`, registerView);

export default apiRouter;