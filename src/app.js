import express from "express";
import createHttpError from "http-errors";
import cors from "cors";

import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import trainerRouter from "./routes/trainerRouter.js";
import courseRouter from "./routes/courseRouter.js";
import config from "./config/config.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: [config.frontedUrl],
  Credential: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      message: "Wel-Come to X Coders IT.",
    });
    next();
  } catch (error) {
    return next(createHttpError(500, "Something went wrong."));
  }
});

app.use("/api/trainer", trainerRouter);
app.use("/api/course", courseRouter);


app.use(globalErrorHandler)
export default app;