// response.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  test_id: { type: Schema.Types.ObjectId, ref: "Test", required: true },
  responses: [
    {
      question_id: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      response: { type: String, required: true },
      score: { type: Number },
      timeTaken: { type: Number }, // Time taken in milliseconds
    },
  ],
  user_score: { type: Number },
  total_score: { type: Number },
  timeTaken: { type: Number }, // Time taken in milliseconds
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Response", responseSchema);
