// Login route
import express from "express";
import User from "../models/user.js";
import ErrorRes from "../models/error_res.js";
import decodeJWT from "../utils/util.js";
import crypto from "crypto";
const login = express.Router();

function generateSessionId() {
  // Use a cryptographically secure random number generator
  const randomBytes = crypto.randomBytes(16);

  // Convert the random bytes to a hexadecimal string
  const sessionId = randomBytes.toString("hex");

  return sessionId;
}

login.get("/", (req, res) => {
  return res.render("index.ejs");
});

login.post("/", async (req, res) => {
  const { credential } = req.body;

  if (credential == null || credential == "") {
    return res.status(400).json(new ErrorRes("Required fields are missing."));
  }
  const { email, name, profile, g_id } = decodeJWT(credential);
  try {
    // Check if the user with the provided g_id exists
    let user = await User.findOne({ g_id });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({
        name: name,
        email: email,
        g_id: g_id,
        imageUrl: profile,
      });
    }
    user.token = generateSessionId();
    user.loggedIn = true;
    // Save the user to the database
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(new ErrorRes("Internal Server Error"));
  }
});

export default login;
