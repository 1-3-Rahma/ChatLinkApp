// src/components/ChatWindow.js
import React, { useState, useEffect, useRef } from 'react';
import MessageInputContainer from '../MessageInputContainer/MessageInputContainer';
import back from '../icons/back.png';
import './ChatWindow.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, resetMessage, setRoom, uploadMessages } from '../../redux/roomSlice';

const socket = io('http://localhost:5000'); // Connect to backend


function ChatWindow({ name, profilePicture, onBackClick, roomName, chats }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.chat.loggedInUser);
  const loggedInUserID = loggedInUser ? loggedInUser._id : null;
  const messages = useSelector((state) => state.room.messages);
  const [isTyping, setIsTyping] = useState(false); // New state for typing
  const [typingUser, setTypingUser] = useState(''); // Tracks the user who is typing
  const formatTimeToHours = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  useEffect(() => {
    dispatch(resetMessage());
    chats.forEach((chat) => {
      const formattedChat = {
        ...chat,
        time: formatTimeToHours(chat.time),
      };
      dispatch(addMessage(formattedChat));
    });
  }, [chats, dispatch]);

  const [warning, setWarning] = useState('');
  const chatEndRef = useRef(null);
  const currentRoom = useSelector((state) => state.room.currentRoom);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format: HH:MM AM/PM
  };

  useEffect(() => {
    // Listen for messages from the server
    socket.on('receiveMessage', (data) => {
      dispatch(addMessage(data));
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [dispatch]);
  const joinRoom = () => {
    if (roomName.trim()) {
      socket.emit('joinRoom', roomName);
    }
  };
  dispatch(setRoom(roomName));
  useEffect(() => joinRoom(), [currentRoom]);

  const sendMessage = (message) => {
    if (currentRoom) {
      const messagePayload = {
        _id: currentRoom,
        content: message.message,
        sender: loggedInUser,
        time: getCurrentTime(),
        readBy: [loggedInUserID],
      };

      socket.emit('sendMessage', messagePayload);
    }
  };

  const handleSendMessage = (message) => {

    if (message.trim() === '') {
      setWarning('EMPTY MESSAGE!');
      setTimeout(() => {
        setWarning('');
      }, 1500);

      return;
    }
    setWarning('');
    sendMessage({ message });
    dispatch(uploadMessages({ roomID: currentRoom, content: message }));

  };

  // Emit typing event when user starts typing
  const handleTyping = () => {
    if (!isTyping) {
      socket.emit('typing', { roomName, user: loggedInUser});
      setIsTyping(true);
    }
  };

  // Emit stopped typing event after a delay
  const handleStoppedTyping = () => {
    setTimeout(() => {
      socket.emit('stoppedTyping', { roomName, user: loggedInUser });
      setIsTyping(false);
    }, 3000); // 3 seconds delay after stopping typing
  };


  // Listen for typing events from the server
  useEffect(() => {
    socket.on('userTyping', ({ user }) => {
      if (user !== loggedInUser) {
        setTypingUser(user);
      }
    });

    socket.on('userStoppedTyping', ({ user }) => {
      if (user !== loggedInUser) {
        setTypingUser(''); // Clear typing indicator when they stop typing
      }
    });

    return () => {
      socket.off('userTyping');
      socket.off('userStoppedTyping');
    };
  }, [loggedInUser]);

  // useEffect(() => {
  //   setMessages([]); // Clear messages when the chat changes
  // }, [name, profilePicture]);


  // const getCurrentTime = () => {
  //   const now = new Date();
  //   return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format: HH:MM AM/PM
  // };

  // const handleSendMessage = (message) => {
  //   if (message.trim() === '') {
  //     setWarning('EMPTY MESSAGE!'); // Warning for empty message
  //     setTimeout(() => {
  //       setWarning('');
  //     }, 1500);
  //     return; // Prevent sending empty message
  //   }
  //   setWarning('');
  //   // Add the sent message
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { content: message, isSender: true, time: getCurrentTime() },
  //   ]);
  // };

  // const generateFakeReply = () => {
  //   const replies = [
  //     "That's interesting!",
  //     "Can you tell me more?",
  //     "I see what you mean.",
  //     "Absolutely!",
  //     "Thanks for sharing!",
  //   ];
  //   const randomReply = replies[Math.floor(Math.random() * replies.length)];
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { content: randomReply, isSender: false, time: getCurrentTime() },
  //   ]);
  // };

  // useEffect(() => {
  //   if (messages.length > 0 && messages[messages.length - 1].isSender) {
  //     const timer = setTimeout(() => {
  //       generateFakeReply();
  //     }, 2000); // Fake reply after 2 seconds

  //     return () => clearTimeout(timer);
  //   }
  // }, [messages]);

  return (
    <div className="chat-content d-flex flex-column flex-grow-1">
      <div className="chat-header d-flex align-items-center p-2">
        <img
          src={back}
          alt="Back"
          className="back-arrow me-2"
          onClick={onBackClick}
        />
        <img
          id="profilePhoto"
          src={profilePicture}
          alt="Profile Photo"
          className="rounded-circle me-2"
          width="50"
          height="50"
        />
        <h2 id="chatName" className="clickable" onClick={() => navigate('/groupParticipantsListPage')}>
          {name}
        </h2>
      </div>

      {/* Display warning message */}
      {warning && (
        <div className="warning-message text-danger fw-bold mb-3 p-2 border rounded">
          {warning}
        </div>
      )}
      {}
      <div id="chat-box" className="border p-2 overflow-auto " style={{ borderRadius: '30px', height: '70vh', backgroundColor: '#f1f1f15d' }}>
        {/* Display messages */}
        {console.log(messages)}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender._id === loggedInUserID ? 'sent' : 'received'} mb-2`}>
            <p>
              {msg.sender._id === loggedInUserID ? <strong>You:</strong> : <strong>{msg.sender.firstName +" "+msg.sender.lastName}:</strong>} {msg.content}
            </p>
            <span className="message-time">{msg.time}</span> {/* Display timestamp */}
          </div>
        ))}
         {/* Typing Indicator */}
         {typingUser && (
          <div className="received">
            {typingUser._id === loggedInUserID ? 'Typing...' : `${typingUser.firstName} is typing...`}
          </div>
        )}
        
        <div ref={chatEndRef} /> {/* Empty div to scroll to */}
      </div>

      <MessageInputContainer onSend={handleSendMessage} onTyping={handleTyping} onStoppedTyping={handleStoppedTyping}/>
    </div>

  );
}

export default ChatWindow;
