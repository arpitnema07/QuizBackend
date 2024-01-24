import mongoose from "mongoose";

const Schema = mongoose.Schema;
// Question Schema
const questionSchema = new Schema({
  test_id: { type: Schema.Types.ObjectId, ref: "Test" },
  desc: { type: String, required: true },
  type: { type: Number }, // 0 - Multiple Choice, 1 - Descriptive
  options: { type: [String] },
  ans_option: { type: Number },
  ans_text: { type: String },
  marks: { type: Number },
  time: { type: Number }, // in second
});

export default mongoose.model("Question", questionSchema);
