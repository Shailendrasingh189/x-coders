import { required } from "joi";
import { Schema, model } from "mongoose";

const AdmissionSchema = new Schema(
  {
    admissionId: {
      type: String,
      unique: true,
      default: "XCA",
    },
    name: {
      type: String,
      required: [true, "Student Name is required."],
    },
    fatherName: {
      type: String,
      required: [true, "Father Name is required."],
    },
    motherName: {
      type: String,
      required: [true, "Mother Name is required."],
    },
    gender: {
      type: String,
      // required: [true, "Gender is required."],
      enum: ["Male", "Female", "Other"],
    },
    academics: {
      type: String,
      required: [true, "Academics are required."],
    },
    DOB: {
      type: Date,
      required: [true, "Date of Birth is requiered."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    contact: {
      type: String,
      required: [true, "Phone number is required."],
    },
    marks: {
      tyoe: Number,
      required: [true, "Marks are required."],
    },
    temporaryAddress: {
      type: String,
      required: [true, "Address is required."],
    },
    permanentAddress: {
      type: String,
      required: [true, "Address is required."],
    },

    sourceOfAdmission: {
      type: String,
    },

    refrence: {
      type: String,
    },
    uploadPhoto: {
      type: String,
    },

    // courseEnrolled: {
    //   type: String,
    //   required: [true, "Course enrolled is required."],
    // },
    // admissionDate: {
    //   type: Date,
    //   required: true,
    //   default: Date.now,
    // },
    // paymentStatus: {
    //   type: String,
    //   enum: ["Pending", "Completed", "Failed"],
    //   default: "Pending",
    // },
  },

  { timestamps: true }
);

const Admission = model("Admission", AdmissionSchema);

export default Admission;
