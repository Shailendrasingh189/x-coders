import { Counter } from "../models/counterModel.js";

const initializeCounter = async () => {
  const courseCounter = await Counter.findOne({ name: "courseId" });
  if (!courseCounter) {
    await Counter.create({ name: "courseId", seq: 0 });
  }

  const trainerCounter = await Counter.findOne({ name: "trainerId" });
  if (!trainerCounter) {
    await Counter.create({ name: "trainerId", seq: 0 });
  }
};

initializeCounter();
