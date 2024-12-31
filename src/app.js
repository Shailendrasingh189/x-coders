import express from "express";
import createHttpError from "http-errors";
import cors from "cors";

import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import trainerRouter from "./routes/trainerRouter.js";
import courseRouter from "./routes/courseRouter.js";
import enquiryRouter from "./routes/enquiryRouter.js";
import admissionRouter from "./routes/admissionRouter.js";
import config from "./config/config.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

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

app.use("/api/trainers", trainerRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enquiries", enquiryRouter);
app.use("/api/admitions", admissionRouter);


app.use(globalErrorHandler)
export default app;