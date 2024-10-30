import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ChatList from "../Components/ChatList/ChatList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsRequest } from "../../src/redux/friendsSlice";
function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriendsRequest()); // Dispatch the action on mount
  }, []); // Empty dependency array ensures it runs only once
  
  const handleChatClick = (chat,check) => {
    // Navigate to the ChatPage and pass the chat data
    console.log(chat)
    console.log(check)
    navigate("/ChatPage", { state: { selectedChat: chat , check } });
  };

  return (
    <div className="Main">
      <ChatList onChatClick={handleChatClick} />
    </div>
  );
}

export default MainPage;
