import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
export const sendMessageToUser = async (req, res) => {
  try {
    const { recieverId } = req.params;
      const senderId = req.user._id;
      const { message } = req.body

    let conversation = await Conversation.findOne({
      participants: { $all: [recieverId, senderId] },
    });
      
      if (!conversation) {
          conversation = await Conversation.create({
              participants: [senderId, recieverId]
          })
      }

      const newMessage = new Message({
          senderId: senderId,
          recieverId: recieverId,
          message: message
      })
      await newMessage.save()

      if (newMessage) {
          conversation.messages.push(newMessage._id)
      }
      await conversation.save()
      res.status(200).json({ message: newMessage })
  } catch (error) {
    console.log(`Error in sendMessage controller: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
