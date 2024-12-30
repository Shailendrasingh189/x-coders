import { Counter } from "../models/counterModel.js";

const initializeCounter = async () => {
  const courseCounter = await Counter.findOne({ name: "courseId" });
  if (!courseCounter) {
    await Counter.create({ name: "courseId", seq: 0 });
  }

    const enquiryCounter = await Counter.findOne({ name: "enquiryId" });
    if (!enquiryCounter) {
      await Counter.create({ name: "enquiryId", seq: 0 });
    }
  const trainerCounter = await Counter.findOne({ name: "trainerId" });
  if (!trainerCounter) {
    await Counter.create({ name: "trainerId", seq: 0 });
  };
  
   const admissionCounter = await Counter.findOne({ name: "admissionId" });
   if (!admissionCounter) {
     await Counter.create({ name: "admissionId", seq: 0 });
   }
};

initializeCounter();
