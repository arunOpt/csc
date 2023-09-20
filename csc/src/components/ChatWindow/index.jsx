import "./Chatbot.css"; 
import chatbotIcon from "../../assets/bot-img.svg"; 
import useChatWindow from "../../hooks/chatWindow";

const Chatbot = () => {
 const {
  messages,
  isMinimized,
  inputMessage,
  handleInputChange,
  handleInputKeyDown,
  handleSendMessage,
  toggleMinimize
}=useChatWindow()
  return (
    <>
      {!isMinimized ? (
        <div className={`chatbot-container`}>
          <div className="chatbot-header" onClick={toggleMinimize}>
            <span>Chatbot</span>
            <button>{isMinimized ? "+" : "-"}</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your query regarding optisol..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div className="chatbot-container-minimized minimized">
          <div className="chatbot-minimized " onClick={toggleMinimize}>
            <img src={chatbotIcon} alt="Chatbot" />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
