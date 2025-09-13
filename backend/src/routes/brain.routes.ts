import { Router } from "express";
import { brainShare, getBrainByShareLink } from "../controller/brain.controller";
import { auth } from "../middlewares/middleware";

const brainRouter = Router();


brainRouter.post("/share", auth, brainShare)
brainRouter.get("/getBrain/:shareLink", auth, getBrainByShareLink)

export {
    brainRouter
}