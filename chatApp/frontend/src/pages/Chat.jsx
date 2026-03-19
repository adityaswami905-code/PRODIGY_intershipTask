import { useState, useEffect, useContext } from "react";
import { socket } from "../socket/socket";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  //  Room ID
  const getRoomId = (id1, id2) =>
    id1 < id2 ? id1 + id2 : id2 + id1;

  //  Load users
  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      const res = await API.get("/users");
      setUsers(res.data.filter((u) => u._id !== user._id));
    };

    fetchUsers();
  }, [user]);

  //  Load messages
  useEffect(() => {
    if (!selectedUser) return;

    const roomId = getRoomId(user._id, selectedUser._id);

    socket.emit("join_room", roomId);

    const fetchMessages = async () => {
      const res = await API.get(`/messages/${roomId}`);
      setMessages(res.data);
    };

    fetchMessages();
  }, [selectedUser]);

  //  Socket listener
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  //  Send text message
  const sendMessage = () => {
    if (!message || !selectedUser) return;

    const roomId = getRoomId(user._id, selectedUser._id);

    const msg = {
      roomId,
      senderId: user._id,
      receiverId: selectedUser._id,
      text: message,
      type: "text",
    };

    socket.emit("send_message", msg);
    setMessage("");
  };

  //  FILE UPLOAD ( CLOUDINARY)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file || !selectedUser) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const roomId = getRoomId(user._id, selectedUser._id);

      // Upload to backend → Cloudinary
      const res = await API.post("/upload", formData);

      const msg = {
        roomId,
        senderId: user._id,
        receiverId: selectedUser._id,
        text: res.data.url,
        type: "image",
      };

      socket.emit("send_message", msg);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        <ChatWindow
          user={user}
          selectedUser={selectedUser}
          messages={messages}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleFileUpload={handleFileUpload} //  IMPORTANT
        />
      </div>
    </div>
  );
};

export default Chat;