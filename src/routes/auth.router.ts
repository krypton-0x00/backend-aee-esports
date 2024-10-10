import { Router } from "express";
import register from "../controllers/auth/register.controller.js";
import login from "../controllers/auth/login.controller.js";
import logout from "../controllers/auth/logout.controller.js";
import { verify } from "../controllers/auth/verify.controller.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.get("/user",verify)

export default authRouter;
