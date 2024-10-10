import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
 

export const verifyEmail = async (req: Request, res: Response) => {
   const {code,email} = req.body;
   try {
    if(!code){
      return res.status(400).json({
        success: false,
        message: "OTP is required"
      })
    }
    const user = await prisma.user.findUnique(
        {
            where:{
                email,
            }
        }
    )
    if(!user){
      return res.status(400);
    }
    const isOtpValid = user.verifactionToken === code.toString();

    if(!isOtpValid){
        return res.status(401).json({success:false,message:"Invalid otp"})
    }

    await prisma.user.update({
        where:{
            email
        },
        data:{
            verifactionToken:null,
            verificationExpiresAt:null,
            isVerified:true,
            lastLogin:new Date()
        }
    })
    return res.status(200).json({
        success: true,
        message: "Email verified successfully",
    })
    
   } catch (error) {
        console.log("[!] Error: ", error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
   }
    
}