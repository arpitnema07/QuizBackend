// Login route
import express from "express";
import User from "../models/user.js";
import Test from "../models/test.js";
import Question from "../models/question.js";

import ErrorRes from "../models/error_res.js";

const question = express.Router();

question.post("/", async (req, res) => {
  const {
    _id,
    token,
    test_id,
    desc,
    type,
    options,
    ans_option,
    ans_text,
    marks,
    time,
  } = req.body;

  if (
    _id == null ||
    _id == "" ||
    token == null ||
    token == "" ||
    test_id == null ||
    test_id == "" ||
    desc == null ||
    desc == "" ||
    type == null ||
    type == "" ||
    options == null ||
    options == "" ||
    marks == "" ||
    marks == null ||
    time == "" ||
    time == null
  ) {
    return res.status(400).json(new ErrorRes("Required fields are missing."));
  }
  try {
    let user = await User.findOne({ _id: _id, token: token });

    if (!user || !user.admin) {
      return res.status(404).json(new ErrorRes("Authentication Failure"));
    }
    const test = await Test.findById(test_id);
    if (!test) {
      return res.status(404).json(new ErrorRes("Test not Found!"));
    }
    const question = new Question({
      test_id,
      desc,
      type, // 0 - Multiple Choice, 1 - Descriptive
      options,
      ans_option,
      ans_text,
      marks,
      time, // in second
    });
    question.save();
    test.questions.push(question._id);
    test.save();
    res.status(200).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

question.get("/:id", async (req, res) => {
  const ques_id = req.params.id;
  const { _id, token } = req.body;

  if (
    _id == null ||
    _id == "" ||
    token == null ||
    token == "" ||
    ques_id == null ||
    ques_id == ""
  ) {
    return res.status(400).json(new ErrorRes("Required fields are missing."));
  }
  try {
    let user = await User.findOne({ _id: _id, token: token });

    if (!user) {
      return res.status(404).json(new ErrorRes("Authentication Failure"));
    }
    let question = await Question.findById(ques_id);

    if (!question) {
      return res.status(404).json(new ErrorRes("Question not found!"));
    }

    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default question;
