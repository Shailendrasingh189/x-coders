import { Router } from "express";
import { createEnquiry, deleteEnquiry, getAllEnquiry, getEnquiryById, updateEnquiry } from "../controllers/enquiryController.js";


const router = Router();

router.post("/create", createEnquiry);
router.get("/read", getAllEnquiry);
router.get("/read/:enquiryId", getEnquiryById);
router.put("/update/:enquiryId", updateEnquiry);
router.delete("/delete/:enquiryId", deleteEnquiry);

export default router;