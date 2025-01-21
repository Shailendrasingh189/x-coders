import createHttpError from "http-errors";
// import cloudinary from ""
import Admission from "../models/admissionModel.js";
import { Counter } from "../models/counterModel.js";

const createAdmission = async (req, res, next) => {
  try {
    const {
      name,
      fatherName,
      motherName,
      academics,
      DOB,
      email,
      contact,
      marks,
      temporaryAddress,
      permanentAddress,
      sourceOfAdmission,
      reference,
    } = req.body;
    if (
      !name ||
      !fatherName ||
      !motherName ||
      !academics ||
      !DOB ||
      !email ||
      !contact ||
      !marks ||
      !temporaryAddress ||
      !permanentAddress
    ) {
      return next(createHttpError(400, "All required fields must be filled."));
      //  return res
      //    .status(400)
      //    .render("error", { message: "All required fields must be filled." });
    }

    const existingAdmission = await Admission.findOne({ email });
    if (existingAdmission) {
      return next(createHttpError(400, "This student is already registered."));
      //  return res
      //    .status(400)
      //    .render("error", { message: "This student is already registered." });
    }

    if (!req.file) {
      return next(createHttpError(400, "Upload photo is required."));
      //  return res
      //    .status(400)
      //    .render("error", { message: "Upload photo is required." });
    }

    // const uploadPhoto = req.file.path;

    const counter = await Counter.findOneAndUpdate(
      { name: "trainerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const admissionId = `XCA${String(counter.seq).padStart(3, "0")}`;

    const uploadPhotoUrl = req.file ? req.file.path : null;

    // Create new admission record
    const newAdmission = new Admission({
      admissionId,
      name,
      fatherName,
      motherName,
      academics,
      DOB,
      email,
      contact,
      marks,
      temporaryAddress,
      permanentAddress,
      sourceOfAdmission,
      reference,
      uploadPhoto: uploadPhotoUrl,
    });

    await newAdmission.save();

    res.status(201).json({
      message: "Admission created successfully.",
      success: true,
      admission: newAdmission,
    });
    //  res
    //    .status(201)
    //   .render("success", { message: "Admission created successfully." });
  } catch (error) {
    next(createHttpError(500, "Server Error while creating admission."));
    //  res
    //    .status(500)
    //    .render("error", { message: "Server Error while creating admission." });
  }
};

const allAdmissions = async (req, res, next) => {
  try {
    const admissions = await Admission.find(); // Fetch all admissions
    const formattedAdmissions = admissions.map((admission) => {
      // Format DOB to a human-readable string
      admission.DOB = admission.DOB.toLocaleDateString();
      return admission;
    });
    res.json({ success: true, admissions: formattedAdmissions });
  } catch (error) {
    next(createHttpError(500, "Server Error while fetching admissions."));
  }
};

const editAdmission = async (req, res, next) => {
  try {
    const { id: admissionId } = req.params;
    let updatedData = req.body;

    console.log("Admission ID:", admissionId);
    console.log("Updated Data:", updatedData);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "admissions",
      });

      updatedData.uploadPhoto = result.secure_url;
    }

    const admission = await Admission.findOneAndUpdate(
      { admissionId },
      updatedData,
      { new: true }
    );

    if (!admission) {
      return next(createHttpError(404, "Admission not found"));
    }

    res.status(200).json({
      success: true,
      message: "Admission updated successfully",
      admission,
    });
  } catch (err) {
    console.error("Error in editAdmission:", err);
    next(createHttpError(500, "Server Error while updating admission"));
  }
};
  
export { createAdmission, allAdmissions, editAdmission };
