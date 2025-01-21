import createHttpError from "http-errors";
import { Enquiry } from "../models/enquiryModel.js";
import { Counter } from "../models/counterModel.js";

const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      course,
      contactNo,
      courseFees,
      finalizeFees,
      academicQualifaction,
      referral,
      yearOfPassing,
      sourceOfEnquiry,
      status,
      demo,
      followUp,
    } = req.body;

    const counter = await Counter.findOneAndUpdate(
      { name: "enquiryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const enquiryId = `XCE${String(counter.seq).padStart(3, "0")}`;
    const enquiry = new Enquiry({
      enquiryId,
      name,
      email,
      course,
      contactNo,
      courseFees,
      finalizeFees,
      academicQualifaction,
      yearOfPassing,
      sourceOfEnquiry,
      referral,
      status,
      demo,
      followUp,
    });
    await enquiry.save();
    if (enquiry) {
      res.status(200).json({
        success: true,
        message: "Enquiry save successfully",
        enquiryData: enquiry,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "wrong",
    });
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

const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      course,
      contactNo,
      courseFees,
      finalizeFees,
      academicQualifaction,
      yearOfPassing,
      sourceOfEnquiry,
      referral,
      status,
      demo,
      followUp,
    } = req.body;
    console.log(req.body);
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      {
        name,
        email,
        course,
        contactNo,
        courseFees,
        finalizeFees,
        academicQualifaction,
        yearOfPassing,
        sourceOfEnquiry,
        referral,
        status,
        demo,
        followUp,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
      message: "Enquiry deleted successfully.",
      success: true,
      enquiry,
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
