// Login route
import express from "express";
import User from "../models/user.js";
import ErrorRes from "../models/error_res.js";

const login = express.Router();

login.post("/", async (req, res) => {
  const { g_id, token, email } = req.body;

  if (
    g_id == null ||
    g_id == "" ||
    token == null ||
    token == "" ||
    email == null ||
    email == ""
  ) {
    return res.status(400).json(new ErrorRes("Required fields are missing."));
  }
  try {
    // Check if the user with the provided g_id exists
    let user = await User.findOne({ g_id });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({ g_id });
    }
    user.email = email;
    user.token = token;
    user.loggedIn = true;
    // Save the user to the database
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default login;
