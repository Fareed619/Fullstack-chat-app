import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const generateToken = (userId, res) => {
  const token = jwt.sign({ user: { _id: userId } }, process.env.JWTSECRETKET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  
  return token;
};
