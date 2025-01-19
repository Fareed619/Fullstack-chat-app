import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { configDotenv } from "dotenv";
import { generateToken } from "../utils/utils.js";

configDotenv();

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // step 1 => check if that user is exsits or not
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exists" });
    }

    // step 2 => hash the password before stote it in database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // stpe 3 => create new instance from USER MODEL
    const newUser = new UserModel({
      email,
      fullName,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({ message: "Invalid User data" });
    }

    // step 4 => gererate token and send it to the client
    generateToken(newUser._id, res);

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(`Error in signup controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // step 1  => to chcek all fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 charcaters" });
    }

    // step 2 => check if user exists in our database or not
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentails" });
    }

    // step 3 => check if the user's password is same as the password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentails" });
    }

    // step 4 => gereate token and send to client
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Error in login controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error in logout controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile Pic is required" });
    }
    console.log("profile pic befor ", profilePic);
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    console.log("upload res after ", uploadResponse);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`Error in update profile: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in checkAuth controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
