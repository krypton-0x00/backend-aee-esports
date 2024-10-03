import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../prisma/prismaClient";


interface CustomRequest extends Request {
  user?: any;  
}


export default class Tokens {
  static maxAge:number = 1000 * 60 * 60 * 24 * 1; //1 day

  static generateJWT(email:string, days:number=1){
    this.maxAge *= days;
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: this.maxAge.toString(),
    });
    return token;
     
  }
  static async verifyJWT(JWTtoken:string,req:CustomRequest,res:Response){
    try {
      const decoded = jwt.verify(JWTtoken, process.env.JWT_SECRET as string) as JwtPayload;
      if(!decoded){
        return res.status(401).json({
          sucess:false,
          message: "[-] Unauthorized",
        })
      }
      const user = await prisma.user.findFirst(
        {
          where:{
            email:decoded.email
          }
        }
      )
      if(!user){
        return res.status(401).json({
          success:false,
          message: "[-] Unauthorized- User does not exist.",
        })
      }
      req.user = user;

    } catch (error) {
      console.log("[!] Error:protected Route middleware",error)
      res.status(500).json({
        success:false,
        message: "[-] Internal Server Error",
      })
    }

  }


  static setCookie(res:Response,token:string,days:number=1,){
    this.maxAge *= days;
    res.cookie("jwt", token, {
      maxAge: this.maxAge,
      httpOnly: true,
      sameSite: "lax",
      // secure: process.env.NODE_ENV !== "development",
    });
  }


  static removeCookie(res:Response,cookieName="jwt"){
    res
    .cookie(cookieName, "", {
      maxAge: 0,
      httpOnly: true,
    })
  }
}