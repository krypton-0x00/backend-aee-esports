import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

type ID = {
  id: string;
};

export default async function checkAuth(req: Request, res: Response) {
  try {
    const { id }: ID = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        tournaments: true,
        tournamentCount: true,
        isVerified: true,
      },
    });
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
}
