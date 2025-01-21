import { Schema, model } from "mongoose";

const EnquirySchema = new Schema({
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
  contactNo: {
    type: String,
    required: [true, "Mobile Number is required."],
  },
  academicQualifaction: {
    type: String,
    required: [true, "Academic Qualification is required."],
  },
  yearOfPassing: {
    type: String
  },
  sourceOfEnquiry: {
    type: String,
  },
  referral: {
    type: String
  }
,
  course: {
    type: String,
    required: [true, "mention the course you wish to join"],
  },
  courseFees: {
    type: Number,

  },
  finalizeFees: {
    type: Number,
  },

  status: {
    type: String,
    default: "Interested",

  },
  demo: {
    type: String,
    default: "no",
  },
  followUp: {
    type: String,
  },

},
  { timestamps: true }
);

const Enquiry = model("Enquiry", EnquirySchema);

export { Enquiry };
