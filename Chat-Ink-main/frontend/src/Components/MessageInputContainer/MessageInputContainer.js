import './MessageInputContainer.css';
import send from '../icons/send.png';
import { useEffect, useState } from 'react';

function MessageInputContainer({ onSend ,onTyping ,onStoppedTyping }) {
  const [userMessage, setUserMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout;

  const handleSend = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      onSend(userMessage);
      setUserMessage('');
      setIsTyping(false); 
      onStoppedTyping();
    }
  };
  const handleTyping = (e) => {
    setUserMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      onTyping();
    }

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      onStoppedTyping(); 
    }, 3);
  };

  useEffect(() => {
    return () => clearTimeout(typingTimeout);
  }, []);

  return (
    <div className="message-input-container ">
      <form className="input-group" onSubmit={handleSend}>
        <input
          type="text"
          className="form-control"
          id="user-message"
          placeholder="Type a message..."
          value={userMessage}
          onChange={handleTyping}
        />
        <button className="btn" type="submit" id="sendButton">
          <img src={send} alt="Send" className="send-icon" />
        </button>
      </form>
    </div>
  );
}

export default MessageInputContainer;
