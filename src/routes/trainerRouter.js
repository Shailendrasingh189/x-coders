import { Router } from "express";
import {
  createTrainer,
  deleteTrainer,
  getAllTrainers,
  updateTrainer,
} from "../controllers/trainerController.js";

const router = Router();

router.post("/create", createTrainer);
router.get("/read", getAllTrainers);
router.get("/read/:trainerId", getAllTrainers);
router.put("/update/:trainerId", updateTrainer);
router.delete("/delete/:trainerId", deleteTrainer);

export default router;
