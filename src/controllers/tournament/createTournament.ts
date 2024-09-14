import { Request, Response } from "express";
import { createTournamentBody } from "../../types/tournament.types.js";
import prisma from "../../prisma/prismaClient.js";
import { createTournamentSchema } from "../../schema/createTournamentSchema.js";

export const createTournament = async (req: Request, res: Response) => {
  try {
    const { error } = createTournamentSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    const {
      name,
      logo,
      orgName,
      game,
      slots,
      unit,
      status,
      visibility,
      userId,
    }: createTournamentBody = req.body;
    if (
      !name ||
      !logo ||
      !orgName ||
      !game ||
      !slots ||
      !unit ||
      !status ||
      !visibility ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (currentUser?.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "Please verify your account first",
      });
    }
    if (
      currentUser?.subscription === "FREE" &&
      currentUser.tournamentCount >= 1
    ) {
      return res.status(401).json({
        success: false,
        message: "Please upgrade your account to create more tournaments",
      });
    }
    const [newTournament, updatedUser] = await prisma.$transaction([
      prisma.tournament.create({
        data: {
          name,
          logo,
          orgName,
          game,
          slots,
          unit,
          status,
          visibility,
          userId,
        },
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          tournamentCount: {
            increment: 1,
          },
        },
      }),
    ]);
    if (!newTournament) {
      return res.status(400).json({
        success: false,
        message: "Tournament creation failed",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      data: newTournament,
    });
  } catch (error) {
    console.log("[-] Error occured in createTournament Controller :", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
