import { Counter } from "../models/counterModel.js";

const initializeCounter = async () => {
  const counter = await Counter.findOne({ name: "trainerId" || "courseId" });
  if (!counter) {
    await Counter.create({ name: "trainerId"|| "courseId", seq: 0 });
  }
};

initializeCounter();