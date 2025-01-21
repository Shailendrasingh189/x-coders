import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { allAdmissions, createAdmission, editAdmission } from "../controllers/admissionController.js";

const router = express.Router();

// Admission creation route
router.post("/create", upload.single("uploadPhoto"), createAdmission);
router.get("/list", allAdmissions);
router.put("/:id", upload.single("uploadPhoto"), editAdmission);

export default router;
