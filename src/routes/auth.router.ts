import { Router } from "express";
import register from "../controllers/auth/register.controller";
import login from "../controllers/auth/login.controller";
import logout from "../controllers/auth/logout.controller";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);

export default authRouter;
