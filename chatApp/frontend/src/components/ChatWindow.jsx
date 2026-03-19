import { useEffect, useRef } from "react";

const ChatWindow = ({
  user,
  selectedUser,
  messages,
  message,
  setMessage,
  sendMessage,
  handleFileUpload,
}) => {
  const bottomRef = useRef();

  //  Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 bg-gray-900 text-white">

      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        {selectedUser ? selectedUser.username : "Select a chat"}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
       {messages.map((msg, i) => {
  const isSender = msg.senderId === user._id;

  return (
    <div
      key={i}
      className={`flex ${isSender ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow-md ${
          isSender
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        {/*  IMAGE OR TEXT */}
        {msg.type === "image" ? (
          <img
            src={msg.text}
            alt="chat"
            className="w-40 rounded-lg cursor-pointer"
            onClick={() => window.open(msg.text)}
          />
        ) : (
          msg.text
        )}
      </div>
    </div>
  );
})}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      {selectedUser && (
        <div className="flex items-center gap-2 p-4 bg-gray-800">

          {/*  FILE BUTTON */}
          <label className="cursor-pointer bg-gray-700 px-3 py-2 rounded">
            
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
            />
          </label>

          {/* TEXT INPUT */}
          <input
            className="flex-1 p-2 rounded text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
          />

          {/* SEND BUTTON */}
          <button
            onClick={sendMessage}
            className="px-4 bg-blue-500 rounded"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;