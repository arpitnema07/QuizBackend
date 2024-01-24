import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    g_id: { type: String, required: true },
    total_test: { type: Number, default: 0 },
    avg_score: { type: Number, default: 0 },
    tags: { type: [String] },
    imageUrl: { type: String, required: false },
    token: { type: String, required: true },
    loggedIn: { type: Boolean, required: false },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
