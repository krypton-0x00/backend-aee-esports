import type {  Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/prismaClient.js";
 
import { registerSchema } from "../../schema/registerUserSchema.js";
import Tokens from "../../utils/cookie.util.js";
import { RegisterBody } from "../../types/register.types.js";



export default async function register(req: {body:RegisterBody}, res: Response) {
  try {
    registerSchema.safeParse(req.body);
    const { email,  password, confirmPassword } = req.body;
    
   
     

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
    let payload = {}
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        });
        payload = {
          id: newUser.id,
          email: newUser.email,
        };
      
    } catch (error) {
      console.log("[!] Error occured while hasing password",error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      })
    }
    
    

    const token = Tokens.generateJWT(email,7);
    Tokens.setCookie(res,token,7);
    

     return res
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
