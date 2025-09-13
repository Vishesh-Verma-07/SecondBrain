import { Router } from "express";
import { getUser, signin, signup } from "../controller/user.controller";
import { auth } from "../middlewares/middleware";

const userRouter = Router();
userRouter.get("/", (req, res) => {
    res.send("User route is working");
});

userRouter.post("/signup", signup)

userRouter.post("/signin", signin)

userRouter.get("/getUser", auth, getUser)


export {
    userRouter
}