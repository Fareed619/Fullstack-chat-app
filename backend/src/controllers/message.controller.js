import UserModel from "../models/user.model.js";
import MessageModel from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await UserModel.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // Get all users except me

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(`Error in getUsersForSidebar controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // filter => find (get) all the messages where sender is me and reciver is the other user OR sender is the other user and  I am the rceiver
    const messages = await MessageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in getMessages controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new MessageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const reciverSocketId = getReceiverSocketId(receiverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error in sendMessage controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
