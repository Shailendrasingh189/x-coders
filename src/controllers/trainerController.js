import { Trainer } from "../models/trainerModel.js";
import { Counter } from "../models/counterModel.js";
import createHttpError from "http-errors";

const createTrainer = async (req, res, next) => {
  // // Validate the request body using Joi
  // const { error, value } = trainerValidationSchema.validate(req.body, {
  //   abortEarly: false, // To return all validation errors
  // });

  // if (error) {
  //   const errorMessages = error.details.map((err) => err.message);
  //   return next(createHttpError(400, errorMessages.join(", ")));
  // }

  // // Destructure validated values
  // const { name, email, techStack, course, timing, timeDuration } = value;

  try {
    const { name, email, techStack, course, timing, timeDuration } = req.body;

    // validations
    if (!name || !email || !techStack || !course) {
      return `Name, Email, Tech Stack Must Be Required.`;
    }

    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      return next(createHttpError(400, `This trainer is already registered.`));
    }

    // Get the next sequence for trainerId
    const counter = await Counter.findOneAndUpdate(
      { name: "trainerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const trainerId = `XCT${String(counter.seq).padStart(3, "0")}`;

    const trainer = await Trainer.create({
      trainerId,
      name,
      email,
      techStack,
      course,
      timing,
      timeDuration,
    });

    return res.status(201).json({
      message: "Trainer Created Successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error when creating new trainer.", error)
    );
  }
};

const getAllTrainers = async (req, res, next) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({
      success: true,
      trainers,
    });
  } catch (error) {
    next(createHttpError(500, "Error fetching trainers.", error));
  }
};

const getTrainerById = async (req, res, next) => {
  const { trainerId } = req.params;
  try {
    const trainer = await Trainer.findOne({ trainerId });
    if (!trainer) {
      return next(
        createHttpError(404, `Trainer with ID ${trainerId} not found.`)
      );
    }

    res.status(200).json({
      success: true,
      trainer,
    });
  } catch (error) {
    next(createHttpError(500, "Error fetching trainer.", error));
  }
};

const updateTrainer = async (req, res, next) => {
  const { trainerId } = req.params;
  const updates = req.body;

  try {
    const trainer = await Trainer.findOneAndUpdate({ trainerId }, updates, {
      new: true,
    });

    if (!trainer) {
      return next(
        createHttpError(404, `Trainer with ID ${trainerId} not found.`)
      );
    }

    res.status(200).json({
      message: "Trainer updated successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    next(createHttpError(500, "Error updating trainer.", error));
  }
};

const deleteTrainer = async (req, res, next) => {
  const { trainerId } = req.params;

  try {
    const trainer = await Trainer.findOneAndDelete({ trainerId });
    if (!trainer) {
      return next(
        createHttpError(404, `Trainer with ID ${trainerId} not found.`)
      );
    };

    res.status(200).json({
      message: "Trainer deleted successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    next(createHttpError(500, "Error deleting trainer.", error));
  }
};

export { createTrainer, getAllTrainers, getTrainerById, updateTrainer, deleteTrainer };
