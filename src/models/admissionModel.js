import { Schema, model } from "mongoose";

const AdmissionSchema = new Schema(
  {
    admissionId: {
      type: String,
      unique: true,
    },
    name: { type: String, required: [true, "Student Name is required."] },
    fatherName: { type: String, required: [true, "Father Name is required."] },
    motherName: { type: String, required: [true, "Mother Name is required."] },
    academics: { type: String, required: [true, "Academics are required."] },
    DOB: { type: Date, required: [true, "Date of Birth is required."] },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    contact: { type: String, required: [true, "Contact is required."] },
    marks: { type: Number, required: [true, "Marks are required."] },
    temporaryAddress: {
      type: String,
      required: [true, "Temporary Address is required."],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent Address is required."],
    },
    sourceOfAdmission: { type: String },
    refrence: { type: String },
    uploadPhoto: { type: String, required: true },
  },
  { timestamps: true }
);

const Admission = model("Admission", AdmissionSchema);

export default Admission;
