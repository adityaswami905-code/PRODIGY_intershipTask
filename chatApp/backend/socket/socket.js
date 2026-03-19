const Message = require("../models/Message");

const setupSocket = (io) => {
  let onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });

    // 💬Send message
    socket.on("send_message", async (data) => {
      await Message.create(data);

      io.to(data.roomId).emit("receive_message", data);

      //  Notification
      const receiverSocket = onlineUsers.get(data.receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("notification", data);
      }
    });

    // Typing
    socket.on("typing", (data) => {
      socket.to(data.roomId).emit("show_typing");
    });

    socket.on("stop_typing", (roomId) => {
      socket.to(roomId).emit("hide_typing");
    });

    // Online users
    socket.on("add_user", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("get_online_users", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          onlineUsers.delete(key);
        }
      });
      io.emit("get_online_users", Array.from(onlineUsers.keys()));
    });
  });
};

module.exports = setupSocket;