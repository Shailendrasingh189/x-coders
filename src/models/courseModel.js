import { Schema, model } from "mongoose";

const CourseSchema = new Schema(
  {
    courseId: {
      type: String,
      unique: true,
      default: "XCC",
    },
    name: {
      type: String,
      required: [true, "Course Name is required."],
    },
    techStack: {
      type: String,
      required: [true, "Tech Stack is required, like MERN, MEAN, JAVA etc."],
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
    },
    timing: {
      type: Date,
    },
    timeDuration: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Course = model("Course", CourseSchema);

export default Course;
