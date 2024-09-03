import React, { useContext, useEffect, useState } from "react";
import "./GroupChat.css";
import { SocketProvider, useSocket } from "../../contexts/SocketProvider";
import io from "socket.io-client";
import { LoginContext } from "../../contexts/LoginContext";

const GroupChat = () => {
  const { name } = useContext(LoginContext);
  const { socket, setSocket } = useSocket();
  const [userMessage, setUserMessage] = useState("");
  const [userMessageArr, setUserMessageArr] = useState([]);

  useEffect(() => {
    const socketInstance = io("https://chit-chat-backend-81g3.onrender.com");

    socketInstance.on("connect", async () => {
      setSocket(socketInstance);
      console.log("Connected to socket", socketInstance.id);
    });

    return () => {
      socket.disconnect(); // Clean up socket connection on unmount
    };
  }, [setSocket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return; // Prevent sending empty messages

    const obj = {
      name,
      message: userMessage,
    };

    // Emit the message to the server
    socket.emit("sendMessage", obj);

    // Update local message array
    setUserMessageArr((prevArr) => [...prevArr, obj]);
    setUserMessage(""); // Clear the input field
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (obj) => {
      setUserMessageArr((prevArr) => [...prevArr, obj]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, name]);

  return (
    <div className="groupChatMessages">
      <div className="groupChat_Title">
        <div className="groupChat_TitleImg">
          <img src="/images/groupChatIcon.jpg" />
        </div>
        <h3>Chit Chat</h3>
      </div>
      <div className="groupChat_messages">
        {userMessageArr.map((obj) => (
          <div
            style={{
              alignSelf: name === obj.name ? "flex-end" : "flex-start",
            }}
          >
            <p
              className="groupChat_messages_name"
              style={{
                alignSelf: name === obj.name ? "flex-end" : "flex-start",
              }}
            >
              {obj.name}
            </p>
            <p
              className="groupChat_messages_message"
              style={{
                background: name === obj.name ? "#87e7eb" : "#87b5eb",
              }}
            >
              {obj.message}
            </p>
          </div>
        ))}
      </div>
      <div className="groupChat_enterMessage">
        <form onSubmit={handleSendMessage}>
          <input
            placeholder="Enter your message ..."
            type="text"
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
