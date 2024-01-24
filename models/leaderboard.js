import mongoose from "mongoose";

const Schema = mongoose.Schema;

const leaderBoardSchema = new Schema({
  test_id: { type: Schema.Types.ObjectId, ref: "Test" },
  user_scores: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: "User" },
      score: { type: Number },
    },
  ],
});

export default mongoose.model("LeaderBoard", leaderBoardSchema);
