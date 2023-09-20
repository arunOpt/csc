import  { useRef, useEffect,useState } from "react";
import axios from "axios"
import { config } from "../config";
const useChatWindow=()=>{
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isMinimized, setIsMinimized] = useState(false);
    const chatContainerRef = useRef(null);
    const handleInputChange = (e) => {
      setInputMessage(e.target.value);
    };
    const handleInputKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === 'Return') {
        e.preventDefault(); 
        handleSendMessage();
      }
    };
    const handleSendMessage = async() => {
      if (inputMessage.trim() === "") return;
      const tempMessages=[...messages, { text: inputMessage, type: 'user' }]
      setMessages(tempMessages);
      setInputMessage("");
      scrollToBottom();
await axios.post(`${config.backendUrl}/chatbot`, {
    question: inputMessage,
  })
  .then(function (response) {
    const botResponse = {
        text: "response",
        type: "bot",
      };
      setMessages([...tempMessages, botResponse]);
      scrollToBottom();
  })
  .catch(function (error) {
    const botResponse = {
        text: error,
        type: "bot",
      };
      setMessages([...tempMessages, botResponse]);
      scrollToBottom();
  });
    };
  
    const toggleMinimize = () => {
      setIsMinimized(!isMinimized);
    };
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        const latestMessage = chatContainerRef.current.lastChild;
        if (latestMessage) {
          latestMessage.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
    return{
        messages,
        isMinimized,
        inputMessage,
        handleSendMessage,
handleInputChange,
handleInputKeyDown,
toggleMinimize
    }

}
export default useChatWindow;