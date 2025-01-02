import createHttpError from "http-errors";
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
  
export { createAdmission };
