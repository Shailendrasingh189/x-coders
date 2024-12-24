import { required } from "joi";
import { Schema, model } from "mongoose";

const TimeSchema = new Schema(
  {
    date: {
      type: Date,
      required:[true, "Date is required."]
    },
    timing: {
      type: String, // Stored as a string (e.g., "2 hours", "30 minutes")
      required: [true, "Timing is required."],
    },
    timeDuration: {
      type: String, // Stored as a string (e.g., "2 Months 3 months.")
      required: [true, "Time duration is required."],
    },
  },
  { timestamps: true }
);

const Time = model("Time", TimeSchema);
export default Time;
