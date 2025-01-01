import express from "express";
import createHttpError from "http-errors";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import trainerRouter from "./routes/trainerRouter.js";
import courseRouter from "./routes/courseRouter.js";
import enquiryRouter from "./routes/enquiryRouter.js";
import admissionRouter from "./routes/admissionRouter.js";

import config from "./config/config.js";
const app = express();


// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static folder for serving CSS or images
app.use(express.static(path.join(__dirname, "public")));

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


// Route to render the form
app.get("/admission-form", (req, res) => {
  res.render("admissionForm"); // Render the EJS form
});


app.use("/api/admissions", admissionRouter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(globalErrorHandler)
export default app;