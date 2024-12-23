import { Router } from "express";
import { createEnquiry, deleteEnquiry, getAllEnquiry, getEnquiryById, updateEnquiry } from "../controllers/enquiryController.js";


const router = Router();

router.post("/create", createEnquiry);
router.get("/read", getAllEnquiry);
router.get("/read/:trainerId", getEnquiryById);
router.put("/update/:trainerId", updateEnquiry);
router.delete("/delete/:trainerId", deleteEnquiry);

export default router;