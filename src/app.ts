import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import reviewsRouter from "./routes/reviews.router.js";
import tournamentRouter from "./routes/tournament.router.js";

export default function app(): Application {
  dotenv.config({
    path: "../.env"
  });

  const app: Application = express();
  //middlewares
  app.use(express.json());
  app.use(cors(
    {
      origin:"*",
      credentials:true
    }
  ));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));


  app.use("/api/auth/", authRouter);
  app.use("/api/reviews/", reviewsRouter);
  app.use("/api/tournament", tournamentRouter);

 


  app.get("/health-check", (req: Request, res: Response) => {
    res.send("it works");
  });
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running at http${process.env.DEPLOY !== "DEV" ? "s" : ""}://${
        process.env.DOMAIN
      }:${process.env.PORT}/`
    );
  });
  return app;
}
