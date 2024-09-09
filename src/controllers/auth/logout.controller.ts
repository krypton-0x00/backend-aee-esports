import type { Request, Response } from "express";

export default function logout(req: Request, res: Response) {
  res
    .cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logout Successful",
    });
}
