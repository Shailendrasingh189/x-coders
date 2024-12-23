import createHttpError from "http-errors";
import { Enquiry } from "../models/enquiryModel.js";
import { Counter } from "../models/counterModel.js";

const createEnquiry = async (req, res, next) => {

  try {
    const { name, email, contact, course, demo} = req.body;

    // validations
    if (!name || !email || !contact || !course) {
      return `Name, Email, contact, course Must Be Required.`;
    }

    const existingTrainer = await Enquiry.findOne({ email });
    if (existingTrainer) {
      return next(createHttpError(400, `This user is already registered.`));
    }

    // Get the next sequence for trainerId
    const counter = await Counter.findOneAndUpdate(
      { name: "enquiryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const enquiryId = `XCE${String(counter.seq).padStart(3, "0")}`;

    const trainer = await Enquiry.create({
      enquiryId,
      name,
      email,
      contact,
      course,
      demo,
    });

    return res.status(201).json({
      message: "Enquiry submited successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error when creating new Enquiry.", error)
    );
  }
};

const getAllEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.find();
    res.status(200).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    next(createHttpError(500, "Error fetching enquiry.", error));
  }
};

const getEnquiryById = async (req, res, next) => {
  const { enquiryId } = req.params;
  try {
    const enquiry = await Enquiry.findOne({ enquiryId });
    if (!enquiry) {
      return next(
        createHttpError(404, `enquiry with ID ${enquiryId} not found.`)
      );
    }

    res.status(200).json({
      success: true,
      enquiry,
    });
  } catch (error) {
    next(createHttpError(500, "Error fetching enquiry.", error));
  }
};

const updateEnquiry = async (req, res, next) => {
  const { enquiryId } = req.params;
  const updates = req.body;

  try {
    const enquiry = await Enquiry.findOneAndUpdate({enquiryId}, updates, {
      new: true,
    });

    if (!enquiry) {
      return next(
        createHttpError(404, `Enquiry with ID ${enquiryId} not found.`)
      );
    }

    res.status(200).json({
      message: "Enquiry updated successfully.",
      success: true,
      enquiry,
    });
  } catch (error) {
    next(createHttpError(500, "Error updating enquiry.", error));
  }
};

const deleteEnquiry = async (req, res, next) => {
  const { enquiryId } = req.params;

  try {
    const enquiry = await Enquiry.findOneAndDelete({ enquiryId });
    if (!enquiry) {
      return next(
        createHttpError(404, `Enquiry with ID ${enquiryId} not found.`)
      );
    }

    res.status(200).json({
      message: "Trainer deleted successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    next(createHttpError(500, "Error deleting trainer.", error));
  }
};

export {
  createEnquiry,
  getAllEnquiry,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
