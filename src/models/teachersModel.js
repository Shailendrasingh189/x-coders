import {Schema, model} from "mongoose";

const TeachersSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },

}, { timestamps: true });

const Teacher = model("Teacher", TeachersSchema);

export default Teacher;