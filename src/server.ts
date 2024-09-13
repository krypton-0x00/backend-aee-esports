import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router";
import reviewsRouter from "./routes/reviews.router";
dotenv.config();

const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth/", authRouter);
app.use("/api/reviews/", reviewsRouter);

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
