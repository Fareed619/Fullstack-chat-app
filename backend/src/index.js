import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app } from "../src/lib/socket.js";
import path from "path";
// Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

configDotenv();

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cookieParser()); //  allow you to parse a cookie from the request headers

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

const PORT = process.env.PORT;
const __dirname = path.resolve();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
  connectDB();
});
