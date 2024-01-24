// Login route
import express from "express";
import User from "../models/user.js";
import Test from "../models/test.js";
import ErrorRes from "../models/error_res.js";

const test = express.Router();

test.post("/", async (req, res) => {
  const {
    _id,
    token,
    title,
    code,
    username,
    no_of_ques,
    total_marks,
    total_time,
    start_date,
    end_date,
    description,
    tags,
    topic,
  } = req.body;

  if (
    _id == null ||
    _id == "" ||
    token == null ||
    token == "" ||
    title == null ||
    title == "" ||
    code == null ||
    code == "" ||
    username == null ||
    username == "" ||
    no_of_ques == null ||
    no_of_ques == "" ||
    total_marks == null ||
    total_marks == "" ||
    total_time == null ||
    total_time == "" ||
    start_date == null ||
    start_date == "" ||
    end_date == null ||
    end_date == ""
  ) {
    return res.status(400).json(new ErrorRes("Required fields are missing."));
  }
  try {
    let user = await User.findOne({ _id: _id, token: token });

    if (!user) {
      return res.status(404).json({ error: "Auth Failed" });
    }

    const test = new Test({
      title: title,
      description: description,
      tags: tags,
      code: code,
      username: username,
      user_id: _id,
      no_of_ques: no_of_ques,
      topic: topic,
      total_marks: total_marks,
      total_time: total_time, // in minutes
      start_date: start_date,
      end_date: end_date,
    });
    test.save();
    res.status(200).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

test.get("/:code", async (req, res) => {
  const code = req.params.code;
  const { _id, token } = req.query;
  console.log(_id + " Id " + token + " token " + code + " " + req);
  if (
    _id == null ||
    _id == "" ||
    token == null ||
    token == "" ||
    code == null ||
    code == ""
  ) {
    return res.status(400).json(new ErrorRes("Required fields are missing."));
  }
  try {
    let user = await User.findOne({ _id: _id, token: token });

    if (!user) {
      return res.status(404).json(new ErrorRes("Authentication Failure"));
    }
    let test = await Test.findOne({ code: code }).populate("questions");

    if (!test) {
      return res.status(404).json(new ErrorRes("Test not found!"));
    }

    res.status(200).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default test;
