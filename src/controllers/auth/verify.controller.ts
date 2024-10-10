import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verify = (req: Request, res: Response) => {
    try {
        const { cookie } = req.cookies.jwt;
        const decoded = jwt.verify(cookie,process.env.JWT_SECRET as string);
        if(!decoded) return res.status(401).json({success:false})
        res.status(200).json({success:true,message:decoded})
    } catch (error) {
        console.log("[-] Error occured in verify controller.");
        res.status(500).json({success:true,message:"Internal Server Error"})
    }
    
}