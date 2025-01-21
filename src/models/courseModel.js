import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    courseId: {
      type: String,
      unique: true,
      default: "XCC",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Job Guaranted Program",
        "Mastery Program",
        "Foundation Program",
        "IPB Program", //Interview Preparation Bootcamp
        "Crash Courses",
        "MNC Expert Program"
      ],
      required: true,
    },
    courseDuration: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

export default Course;
