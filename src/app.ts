import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import reviewsRouter from "./routes/reviews.router.js";
import tournamentRouter from "./routes/tournament.router.js";

export default function app() {
  dotenv.config();

  const app = express();
  //middlewares
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use("/api/auth/", authRouter);
  app.use("/api/reviews/", reviewsRouter);
  app.use("/api/tournament", tournamentRouter);

  app.get("/health-check", (req, res) => {
    res.send("it works");
  });
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running at http${process.env.DEPLOY !== "DEV" ? "s" : ""}://${
        process.env.DOMAIN
      }:${process.env.PORT}/`
    );
  });
}
