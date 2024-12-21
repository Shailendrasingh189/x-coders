import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/courseController.js";

const router = Router();

router.post("/create",  createCourse);
router.get("/read", getAllCourses );
router.get("/read/:trainerId", getCourseById);
router.put("/update/:trainerId",updateCourse );
router.delete("/delete/:trainerId", deleteCourse);

export default router;
