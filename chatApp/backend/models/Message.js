const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: String,
  senderId: String,
  receiverId: String,
  text: String,
  type: {
    type: String,
    default: "text"
  },
  status: {
    type: String,
    default: "sent"
  }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);