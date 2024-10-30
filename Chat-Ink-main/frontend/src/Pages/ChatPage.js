import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatWindow from "../Components/ChatWindow/ChatWindow";
import ChatList from "../Components/ChatList/ChatList";
import "./ChatPage.css";
import { useSelector } from "react-redux";

function ChatPage() {
  const loggedInUser = useSelector((state) => state.chat.loggedInUser);
  const loggedInUserId = loggedInUser ? loggedInUser._id : null;
  const location = useLocation();
  const navigate = useNavigate();
  const [check, setCheck] = useState(location.state?.check || null);
  const [selectedChat, setSelectedChat] = useState(location.state?.selectedChat || null);
  const handleBackClick = () => {
    setSelectedChat(null); // Reset selectedChat when going back
    navigate("/MainPage"); // Go back to the main page
  };

  const handleChatClick = (chat, check) => {
    setSelectedChat(chat);
    setCheck(check);
    console.log(chat);
    console.log(check)
  };

  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-4 col-lg-4 border-end chat-list">
          <ChatList onChatClick={handleChatClick} />
        </div>
        <div className=" chat-window">
          {selectedChat && check && (
            <ChatWindow
              name={selectedChat.participants[0]._id === loggedInUserId ? selectedChat.participants[1].firstName + ' ' + selectedChat.participants[1].lastName : selectedChat.participants[0].firstName + ' ' + selectedChat.participants[0].lastName}
              profilePicture={selectedChat.participants[0]._id === loggedInUserId ? selectedChat.participants[1].profilePic : selectedChat.participants[0].profilePic}
              onBackClick={handleBackClick}
              roomName={selectedChat._id}
              chats={selectedChat.messages}
            />
          )}
          {selectedChat && !check && (
            <ChatWindow
              name={selectedChat.name}
              profilePicture={selectedChat.photoURL}
              onBackClick={handleBackClick}
              roomName={selectedChat.chat._id}
              chats={selectedChat.chat.messages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
