import mongoose from "mongoose";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
export const sendMessageToUser = async (req, res) => {
  try {
    const { recieverId } = req.params;
    const senderId = req.user._id;
    const { message } = req.body;

    if (senderId.toString() === recieverId) {
      return res
        .status(400)
        .json({ error: "you cannot send message to yourself" });
    }

    if (!mongoose.Types.ObjectId.isValid(recieverId)) {
      return res.status(400).json({ error: "Invalid receiver ID." });
    }
    const verifyReciever = await User.findById(recieverId);
    if (!verifyReciever) {
      return res.status(400).json({ error: "user not found" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [recieverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      recieverId: recieverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // TODO: ADD SOCKET.IO FUNCTIONALITY HERE
      await Promise.all([
          await newMessage.save(),
          await conversation.save()
      ])
    res.status(200).json({ message: newMessage });
  } catch (error) {
    console.log(`Error in sendMessage controller: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessageBetweenTwoUsers = async (req, res) => {
    try {
        const { userToChatId } = req.params
        const senderId  = req.user._id

        const conversation = await Conversation.findOne({
            participants: {$all: [userToChatId, senderId]}
        }).populate({
            path: "messages"
        })
        if (!conversation) {
            return res.status(200).json([])
        }
        const messages = conversation.messages

        return res.status(200).json(messages)
    } catch (error) {
        console.log(`Error in getmessageBetweenuser controller: ${error.message}`)
        return res.status(500).json({error: "Internal Server Error"})
    }
}


