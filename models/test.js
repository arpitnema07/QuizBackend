import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Test Schema
const testSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    tags: { type: [String] },
    code: { type: String, required: true },
    username: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    no_of_ques: { type: Number, required: true },
    topic: { type: String },
    total_marks: { type: Number, required: true },
    avg_user_score: { type: Number },
    total_time: { type: Number, required: true }, // in minutes
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
