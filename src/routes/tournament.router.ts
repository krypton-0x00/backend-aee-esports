import { Router } from "express";
import { createTournament } from "../controllers/tournament/createTournament.js";
import getTournaments from "../controllers/tournament/getTournaments.js";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";

const tournamentRouter = Router();

tournamentRouter.post("/create-tournament",protectedRoute, createTournament);
tournamentRouter.get("/get-tournaments", getTournaments);
export default tournamentRouter;
