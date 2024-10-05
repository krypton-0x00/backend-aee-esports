import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient.js";

export default async function getTournaments(req: Request, res: Response) {
  try {
     
    const tournaments = await prisma.tournament.findMany({
      where: {
        visibility: "PUBLIC",
        status: "UPCOMING",
      },
    });

    if (!tournaments) {
      return res.status(404).json({
        success: false,
        message: "No tournaments found",
      });
    } else {
      return res.status(200).json({tournaments
      });
    }
  } catch (error) {
    console.log("[-] Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
