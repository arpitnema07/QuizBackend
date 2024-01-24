import express from "express";
import User from "../models/user.js";
import ErrorRes from "../models/error_res.js";

const updateProfile = express.Router();
// Update profile route
updateProfile.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { name, tags, token } = req.body;

  try {
    // Find the user by ID
    let user = await User.findOne({ _id: userId, token: token });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (tags) user.tags = tags;

    // Save the updated user
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default updateProfile;
