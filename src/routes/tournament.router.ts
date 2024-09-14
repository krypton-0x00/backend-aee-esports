import { Router } from "express";
import { createTournament } from "../controllers/tournament/createTournament.js";
import getTournaments from "../controllers/tournament/getTournaments.js";

const tournamentRouter = Router();

tournamentRouter.post("/create-tournament", createTournament);
tournamentRouter.get("/get-tournaments", getTournaments);
export default tournamentRouter;
