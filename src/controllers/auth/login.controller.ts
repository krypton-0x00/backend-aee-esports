import { z } from "zod";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateJWT from "../../utils/generateJWT.js";
import prisma from "../../prisma/prismaClient.js";

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8, "Password should be at least 8 characters long"),
// });

export default async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = generateJWT(user.email);
    res
      .cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful",
        payload,
      });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.log("[+] Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
