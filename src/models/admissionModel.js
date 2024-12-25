import { Schema, model } from "mongoose";

const AdmissionSchema = new Schema(
  {
    admission: {
      type: Schema.Types.ObjectId,
      ref: "Enquiry",
    },
  },
  { timestamps: true }
);

const Admission = model("Admission", AdmissionSchema);

export default Admission