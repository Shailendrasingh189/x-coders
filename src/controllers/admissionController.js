import createHttpError from "http-errors";
import path from "path";
import cloudinary from "../config/cloudinary.js";
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
      refrence,
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
      !permanentAddress ||
      !sourceOfAdmission
    ) {
      return next(createHttpError(400, `All fields are required.`));
    }

    const existingAdmission = await Admission.findOne({ email });
    if (existingAdmission) {
      return next(createHttpError(400, `This student is already registered.`));
    }

    if (!req.file) {
      return next(createHttpError(400, "No image file provided."));
    }

    // Upload the file to Cloudinary
    let uploadPhotoUrl = null;
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "admissions",
      });
      uploadPhotoUrl = result.secure_url;
    } catch (err) {
      return next(createHttpError(500, "Error uploading image to Cloudinary."));
    }

    // Get the next sequence for admissionId
    const counter = await Counter.findOneAndUpdate(
      { name: "admissionId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const admissionId = `XCA${String(counter.seq).padStart(3, "0")}`;

    const admission = await Admission.create({
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
      refrence,
      uploadPhoto: uploadPhotoUrl,
    });

    return res.status(201).json({
      message: "Admission created successfully.",
      success: true,
      admission,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error when creating new admission.", error)
    );
  }
};



export { createAdmission };
