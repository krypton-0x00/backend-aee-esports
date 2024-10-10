import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import hashPassword from "../../utils/hashPassword.utils";

export default async function resetPassword(req: Request, res: Response) {
  try {
    const token = req.params.token;
    const { password, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = prisma.user.findUnique({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: {
          gt: new Date(),
        },
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    const hashedPassword = await hashPassword(password);
    const updatedUser = prisma.user.update({
      where: {
        resetPasswordToken: token,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
