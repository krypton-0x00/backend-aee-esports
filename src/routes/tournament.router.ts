import { Router } from "express";
import { createTournament } from "../controllers/tournament/createTournament";

const tournamentRouter = Router();

tournamentRouter.post("/create-tournament", createTournament);

export default tournamentRouter;
