import { z } from "zod";

import type { Request, Response } from "express";
import generateJWT from "../../utils/generateJWT.js";
import bcrypt from "bcryptjs";

import prisma from "../../prisma/prismaClient.js";

// const registerSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8, "Password should be at least 8 characters long"),
//   confirmPassword: z
//     .string()
//     .min(8, "Password should be at least 8 characters long"),
// });

export default async function register(req: Request, res: Response) {
  try {
    const { email, password, confirmPassword } = req.body;
    // const { email, password, confirmPassword } = req.body;

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = generateJWT(email);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    const payload = {
      id: newUser.id,
      email: newUser.email,
    };

    res
      .cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: true,
      })
      .status(201)
      .json({
        success: true,
        message: "User Created.",
        payload,
      });
  } catch (error) {
    console.log("[x] ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
