import type { Request, Response } from "express";
import Tokens from "../../utils/cookie.util";

export default function logout(req: Request, res: Response) {
  Tokens.removeCookie(res);
  res
    .status(200)
    .json({
      success: true,
      message: "Logout Successful",
    });
}
