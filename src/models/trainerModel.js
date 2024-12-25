import { Schema, model } from "mongoose";
// import Joi from "joi";

const TrainerSchema = new Schema(
  {
    trainerId: {
      type: String,
      unique: true,
      default: "XCT",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email must be unique."],
    },
    techStack: {
      type: String,
      required: [
        true,
        "Tech Stack is required, like MERN, MEAN, JAVA Spring boot etc.",
      ],
    },
    course: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    timing: {
      type: String, // "10:00 AM - 12:00 PM"
      required: [true, "Timing is required."],
    },
    timeDuration: {
      type: String, // "2 hours"
      required: [true, "Time duration is required."],
    },
  },
  { timestamps: true }
);


const Trainer = model("Trainer", TrainerSchema);

// const trainerValidationSchema = Joi.object({
//   trainerId: Joi.string().default("XCT"),
//   name: Joi.string().required().messages({
//     "string.empty": "Name is required.",
//   }),
//   email: Joi.string().email().required().messages({
//     "string.empty": "Email is required.",
//     "string.email": "Invalid email format.",
//   }),
//   techStack: Joi.string().required().messages({
//     "string.empty":
//       "Tech Stack is required, like MERN, MEAN, JAVA Spring boot etc.",
//   }),
//   course: Joi.string().required().messages({
//     "string.empty": "Course is required.",
//   }),
//   timing: Joi.date().optional(),
//   timeDuration: Joi.date().optional(),
// });

export { Trainer };
