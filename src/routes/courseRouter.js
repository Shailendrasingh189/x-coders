import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/courseController.js";

const router = Router();

router.post("/create",  createCourse);
router.get("/read", getAllCourses );
router.get("/read/:courseId", getCourseById);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deleteCourse);

export default router;
