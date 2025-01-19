import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

// Sign Up  => http://localhost:5001/api/auth/signup
router.post("/signup", signUp);

// Login  => http://localhost:5001/api/auth/login
router.post("/login", login);

// Logout  => http://localhost:5001/api/auth/login
router.post("/logout", logout);

// Update My Profile => http://localhost:5001/api/auth/update-profile
router.put("/update-profile", protectRoute, updateProfile);

// Check if user is authenticated => http://localhost:5001/api/auth/check
router.get("/check", protectRoute, checkAuth);

export default router;
