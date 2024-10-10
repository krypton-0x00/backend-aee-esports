import { NextFunction, Request, Response } from "express";
import Tokens from "../utils/cookie.util.js";

export default async function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //verify the token
    Tokens.verifyJWT(token, req, res);

    next();
  } catch (error) {
    console.log("[+] Error occured in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
