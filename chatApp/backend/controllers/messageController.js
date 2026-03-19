const Message = require("../models/Message");

//  Get messages by room
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      roomId: req.params.roomId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMessages };