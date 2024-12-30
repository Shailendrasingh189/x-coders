import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { createAdmission } from "../controllers/admissionController.js";

const router = express.Router();

router.post("/create", upload.single("uploadPhoto"), createAdmission);

export default router;
