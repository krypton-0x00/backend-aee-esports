import { Router } from "express";
import getReviews from "../controllers/reviews/getReviews.js";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";

const reviewsRouter = Router();

reviewsRouter.get("/get-reviews", protectedRoute, getReviews);

export default reviewsRouter;
