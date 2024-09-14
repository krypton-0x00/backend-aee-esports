import { Router } from "express";
import { createTournament } from "../controllers/tournament/createTournament";
import getTournaments from "../controllers/tournament/getTournaments";

const tournamentRouter = Router();

tournamentRouter.post("/create-tournament", createTournament);
tournamentRouter.get("/get-tournaments", getTournaments);
export default tournamentRouter;
