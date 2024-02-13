import express from "express";
import User from "../models/user.js";
import Response from "../models/response.js";
import ErrorRes from "../models/error_res.js";

const response = express.Router();

response.post("/", async (req, res) => {
  const { _id, token, test_id, responses, total_score, user_score } = req.body;
  console.log(req.body);
  if (
    _id == null ||
    _id == "" ||
    token == null ||
    token == "" ||
    test_id == null ||
    test_id == "" ||
    responses == null ||
    responses == "" ||
    user_score == null ||
    user_score == "" ||
    total_score == null ||
    total_score == ""
  ) {
    return res.status(400).json(new ErrorRes("Required fields are missing."));
  }
  try {
    let user = await User.findOne({ _id: _id, token: token });

    if (!user) {
      return res.status(404).json(new ErrorRes("Authentication Failure"));
    }

    // Save the user response to the database
    const userResponse = new Response({
      user_id: _id,
      test_id: test_id,
      responses: responses,
      user_score: user_score,
      total_score: total_score,
    });

    await userResponse.save();

    res.status(200).send(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default response;
