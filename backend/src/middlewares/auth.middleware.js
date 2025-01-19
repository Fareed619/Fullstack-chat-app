import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import UserModel from "../models/user.model.js";
configDotenv();
export const protectRoute = async (req, res, next) => {
  try {
    //  step 1 => grap the toke from the cookies  && check if it's exsits or not
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized -- No Token Provided" });
    }

    // step 2 => verify the token and check if it's valid or not
    const decoded = jwt.verify(token, process.env.JWTSECRETKET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized -- Invalid Token" });
    }

    //  step 3 => check if the user is exsits or not
    const user = await UserModel.findById(decoded.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute middleware ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
