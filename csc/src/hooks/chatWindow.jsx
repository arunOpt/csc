import  { useRef, useEffect,useState } from "react";
import  { io }  from 'socket.io-client' 
// import axios from "axios"
import { config } from "../config";
const useChatWindow=()=>{
  const socket = io(config.socketEndPoint);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isMinimized, setIsMinimized] = useState(false);
    const chatContainerRef = useRef(null);

    

    useEffect(() => {

      socket.on("connect", () => {
        console.log(socket.id); 
      });
      
      socket.on("disconnect", () => {
        console.log(socket.id); 
      });

      socket.on("chatBot", (msg) => {
        console.log(msg, "msg"); 
        const tempMessages=[...messages]
        const botResponse = {
          text: msg,
          type: "bot",
        };
        setMessages([...tempMessages, botResponse]);
        scrollToBottom();
      });
  
    },[socket])
    
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
      socket.emit("chatBot",{ question: inputMessage} )
      
// await axios.post(`${config.backendUrl}/chatbot`, {
//     question: inputMessage,
//   })
//   .then(function (response) {
//     const botResponse = {
//         text:response?.data?.message,
//         type: "bot",
//       };
//       setMessages([...tempMessages, botResponse]);
//       scrollToBottom();
//   })
//   .catch(function (error) {
//     console.log(error);
//     const botResponse = {
//         text: "Error connecting... please try again",
//         type: "bot",
//       };
//       setMessages([...tempMessages, botResponse]);
//       scrollToBottom();
//   });
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