import { Trainer } from "../models/trainerModel.js";
import { Counter } from "../models/counterModel.js";
import createHttpError from "http-errors";
import moment from "moment"; // for date formatting

const createTrainer = async (req, res, next) => {

  try {
    const { name, email, techStack, course,date, timing, timeDuration } = req.body;

    // validations
    if (!name || !email || !techStack || !course || !date || !timing || !timeDuration) {
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
      date,
      timing,
      timeDuration,
    });

    // Format dates to dd/mm/yy
    trainer.timing = moment(trainer.timing).format("DD/MM/YY");
    trainer.timeDuration = moment(trainer.timeDuration).format("DD/MM/YY");

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

    // Format dates for all trainers
    const formattedTrainers = trainers.map((trainer) => ({
      ...trainer.toObject(),
      timing: moment(trainer.timing).format("DD/MM/YY"),
      timeDuration: moment(trainer.timeDuration).format("DD/MM/YY"),
    }));

    res.status(200).json({
      success: true,
      trainers: formattedTrainers,
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
