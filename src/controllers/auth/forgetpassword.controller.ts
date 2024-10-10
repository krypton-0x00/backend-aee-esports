import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import generateResetToken from "../../utils/generateResetToken.utils";
import sendMail from "../../mail/resend";

export default async function forgetPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const resetToken = generateResetToken();
    const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour from now
    const userResetToken = await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: new Date(tokenExpiry),
      },
    });

    await sendMail({
      to: email,
      subject: "Password Reset Request for AEE Sports",
      message: `${process.env.CLIENT_URL}reset-password/${resetToken}`,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("[-] Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
