import createHttpError from "http-errors";
import Course from "../models/courseModel.js";
import { Counter } from "../models/counterModel.js";

const createCourse = async (req, res, next) => {
  try {
    const { name, techStack, trainer, timing, timeDuration } = req.body;

    if (!name || !techStack || !timing || !timeDuration) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Get the next sequence for courseId
    const counter = await Counter.findOneAndUpdate(
      { name: "courseId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const courseId = `XCC${String(counter.seq).padStart(3, "0")}`;

    const course = await Course.create({
      courseId,
      name,
      techStack,
      trainer,
      timing,
      timeDuration,
    });

    return res.status(201).json({
      message: "Course Created Successfully.",
      success: true,
      course,
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error while creating course in courseController",
        error
      )
    );
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error While Getting Course in courseController.",
        error
      )
    );
  }
};

const getCourseById = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findOne({ courseId });

    if (!course) {
      return next(
        createHttpError(404, `Course with ID ${courseId} not found.`)
      );
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error While Getting Course in courseController.",
        error
      )
    );
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const course = await Course.findOneAndUpdate({ courseId }, updates, {
      new: true,
    });

    return res.status(200).json({
      message: "Course Update Successfully.",
      success: true,
      course
    });

  } catch (error) {
    return next(
      createHttpError(
        500,
        "Error While updating Course in courseController.",
        error
      )
    );
  }
};

const deleteCourse = async (req, res, next) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findOneAndDelete({ courseId });
    if (!courseId) {
      return next(
        createHttpError(404, `Course with ID ${courseId} not found.`)
      );
    }

    res.status(200).json({
      message: "Course deleted successfully.",
      success: true,
      course,
    });
  } catch (error) {
    next(createHttpError(500, "Error deleting trainer.", error));
  }
};

export { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse };
