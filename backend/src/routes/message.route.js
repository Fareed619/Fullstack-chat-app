import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = Router();

// Get  users for sidebar => http://localhost:5001/api/message/users
router.get("/users", protectRoute, getUsersForSidebar);

// Get messages => http://localhost:5001/api/message/:id
router.get("/:id", protectRoute, getMessages);

// Send Message => http://localhost:5001/api/message/send/:id
router.post("/send/:id", protectRoute, sendMessage);

export default router;
