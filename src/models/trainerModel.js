import { Schema, model } from "mongoose";
import Joi from "joi";

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
      required: [true, "email is required."],
      unique:[true, "Email Must be unique."]
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
    time: {
      type: Schema.Types.ObjectId,
      ref: "Time",
    },
  },
  { timestamps: true }
);

const Trainer = model("Trainer", TrainerSchema);

const trainerValidationSchema = Joi.object({
  trainerId: Joi.string().default("XCT"),
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email format.",
  }),
  techStack: Joi.string().required().messages({
    "string.empty":
      "Tech Stack is required, like MERN, MEAN, JAVA Spring boot etc.",
  }),
  course: Joi.string().required().messages({
    "string.empty": "Course is required.",
  }),
  timing: Joi.date().optional(),
  timeDuration: Joi.date().optional(),
});

export { Trainer, trainerValidationSchema };
