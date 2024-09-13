import { Router } from "express";
import getReviews from "../controllers/reviews/getReviews";

const reviewsRouter = Router();

reviewsRouter.get("/get-reviews", getReviews);

export default reviewsRouter;
