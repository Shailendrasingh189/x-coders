import { Router } from "express";
import {
  createTrainer,
  deleteTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
} from "../controllers/trainerController.js";

const router = Router();

router.post("/create", createTrainer);
router.get("/read", getAllTrainers);
router.get("/read/:trainerId", getTrainerById);
router.put("/update/:trainerId", updateTrainer);
router.delete("/delete/:trainerId", deleteTrainer);

export default router;
