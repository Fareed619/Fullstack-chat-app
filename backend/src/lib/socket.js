import { Server } from "socket.io";
import http from "http";
import express from "express";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
});

// used to store online users
const userSokectMap = {}; //{userId : sokectId}

export function getReceiverSocketId(userId) {
  return userSokectMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected ", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSokectMap[userId] = socket.id;

  // is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSokectMap));

  socket.on("disconnect", () => {
    console.log("A user diconnected", socket.id);
    delete userSokectMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSokectMap));
  });
});
export { io, app, server };
