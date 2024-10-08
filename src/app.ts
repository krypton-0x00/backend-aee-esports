import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import reviewsRouter from "./routes/reviews.router.js";
import tournamentRouter from "./routes/tournament.router.js";
import { whitelist } from "./config/cors.whitelist.js";

export default function app() {
  dotenv.config();

  const app: Application = express();

  const corsOptions = (
    req: Request,
    callback: (
      err: Error | null,
      options?: { origin: boolean; credentials?: boolean }
    ) => void
  ) => {
    const isProduction = process.env.DEPLOY !== "DEV";

    // CORS-> (PRODUCTION)
    if (isProduction) {
      const origin = req.header("Origin");
      if (whitelist.indexOf(origin || "") !== -1 || !origin) {
        callback(null, { origin: true, credentials: true }); // Allow credentials
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    } else {
      // Allow every origin in Dev
      callback(null, { origin: true, credentials: true }); // Allow credentials
    }
  };

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  app.use(express.json({ limit: "16kb" }));
  app.use(cors(corsOptions));
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
