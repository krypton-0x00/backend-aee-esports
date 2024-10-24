import type { Response } from "express";
import prisma from "../../prisma/prismaClient.js";
import { registerSchema } from "../../schema/registerUserSchema.js";
import Tokens from "../../utils/cookie.util.js";
import { RegisterBody } from "../../types/register.types.js";
import { generateVerifactionToken } from "../../utils/generateVerifaction.utils.js";
import sendMail from "../../mail/resend.js";
import hashPassword from "../../utils/hashPassword.utils.js";

export default async function register(
  req: { body: RegisterBody },
  res: Response
) {
  try {
    const isValid = registerSchema.safeParse(req.body);
    if (isValid.error) return;
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords Dont Match.",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const verifactionToken = generateVerifactionToken();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verifactionToken,
        verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hrs
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const token = Tokens.generateJWT(email, 7);

    Tokens.setCookie(res, token, 7);

    await sendMail({
      to: email,
      subject: "Verifaction code",
      message: `Your Otp is ${verifactionToken}`,
    });

    return res.status(201).json({
      success: true,
      message: "User Created.",
      newUser,
    });
  } catch (error) {
    console.log("[x] ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
