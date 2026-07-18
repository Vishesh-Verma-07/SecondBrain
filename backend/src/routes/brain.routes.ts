import { Router } from "express";
import { brainSearch, brainShare, getBrainByShareLink } from "../controller/brain.controller";
import { auth } from "../middlewares/middleware";

const brainRouter = Router();


brainRouter.post("/share", auth, brainShare)
brainRouter.get("/getBrain/:shareLink", getBrainByShareLink)
brainRouter.post('/search', auth, brainSearch);

export {
    brainRouter
}
