import { Router } from "express";
import register from "../controllers/auth/register.controller.js";
import login from "../controllers/auth/login.controller.js";
import logout from "../controllers/auth/logout.controller.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.controller.js";
import forgetPassword from "../controllers/auth/forgetpassword.controller.js";
import resetPassword from "../controllers/auth/resetPassword.controller.js";
import checkAuth from "../controllers/auth/checkAuth.controller.js";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/forget", forgetPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.post("/check-auth", protectedRoute, checkAuth);

export default authRouter;
