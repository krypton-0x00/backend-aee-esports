import { Request, Response } from "express";
import { data } from "./reviewsData.js";
const getReviews = (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: data,
  });
};
export default getReviews;
