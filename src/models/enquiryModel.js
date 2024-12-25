import { Schema, model } from "mongoose";

const EnquirySchema = new Schema(
  {
    enquiryId: {
      type: String,
      unique: true,
      default: "XCE",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "email is required."],
    },
    contact: {
      type: String,
      required: [true, "Mobile Number is required."],
    },

    course: {
      type: String,
      required: true,
    },
    demo: {
      type: Boolean,
      default: false,
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

const Enquiry = model("Enquiry", EnquirySchema);

export { Enquiry };
