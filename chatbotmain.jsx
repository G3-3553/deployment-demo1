import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Send, Mic, Moon, Sun, MessageCircle, Maximize, Minimize, X, Minus } from "lucide-react";
import "./chatbot.css";
const Chatbot = () => {
 const [messages, setMessages] = useState(() => {
   return JSON.parse(localStorage.getItem("chatMessages")) || [];
 });
 const [input, setInput] = useState("");
 const [file, setFile] = useState(null);
 const [darkMode, setDarkMode] = useState(false);
 const [isOpen, setIsOpen] = useState(false);
 const [isMaximized, setIsMaximized] = useState(false);
 const [isMinimized, setIsMinimized] = useState(false);
 const fileInputRef = useRef(null);
 const chatboxRef = useRef(null);
 useEffect(() => {
   if (isOpen && !isMinimized && messages.length === 0) {
     setTimeout(() => {
       setMessages([{ sender: "bot", text: "Hello! Welcome to Xfinity Assistant!\nHow can I assist you today?" }]);
     }, 500);
   }
 }, [isOpen, isMinimized]);
 useEffect(() => {
   if (chatboxRef.current) {
     chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
   }
 }, [messages]);
 useEffect(() => {
   if (isOpen || isMinimized || isMaximized) {
     localStorage.setItem("chatMessages", JSON.stringify(messages));
   }
 }, [messages, isOpen, isMinimized, isMaximized]);
 const handleChatbotToggle = () => {
   if (!isOpen) {
     setIsMaximized(false);
     setIsMinimized(false);
   }
   setIsOpen(!isOpen);
 };
 const minimizeChatbot = () => {
   setIsMinimized(true);
 };
 const restoreChatbot = () => {
   setIsMinimized(false);
 };
 const closeChatbot = () => {
   setIsOpen(false);
   setIsMaximized(false);
   setIsMinimized(false);
   setMessages([]); // Clear chat history when closed
   localStorage.removeItem("chatMessages"); // Remove stored messages
 };
 const sendMessage = async (e) => {
   e.preventDefault();
   if (!input.trim()) return;
   const userMessage = { text: input, sender: "user" };
   setMessages((prevMessages) => [...prevMessages, userMessage]);
   setInput("");
   try {
     const response = await fetch("http://127.0.0.1:5000/process_message", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ message: input })
     });
     const data = await response.json();
     const botMessage = {
       text: data.response,
       sender: "bot",
       buttons: data.buttons || [],
       needsConfirmation: data.needs_confirmation
     };
     setMessages((prevMessages) => [...prevMessages, botMessage]);
   } catch (error) {
     console.error("Error:", error);
   }
 };
 return (
<div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
<div className="chatbot-wrapper">
       {isOpen && !isMinimized ? (
<div className={`chatbot-container ${isMaximized ? "maximized" : ""}`}>
<header className="chatbot-header">
<span>Xfinity Assistant🤖</span>
<div className="chatbot-header-buttons">
<button onClick={() => setDarkMode(!darkMode)} className="theme-toggle-button">
                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
</button>
               {isMaximized ? (
<button onClick={() => setIsMaximized(false)} className="chatbot-control-button">
<Minimize size={20} />
</button>
               ) : (
<button onClick={() => setIsMaximized(true)} className="chatbot-control-button">
<Maximize size={20} />
</button>
               )}
<button onClick={minimizeChatbot} className="chatbot-minimize-button">
<Minus size={20} />
</button>
<button onClick={closeChatbot} className="chatbot-close-button">
<X size={20} />
</button>
</div>
</header>
<div className="chatbot-messages" ref={chatboxRef}>
             {messages.map((msg, index) => (
<div key={index} className={`chatbot-message ${msg.sender}`}>
<p>{msg.text}</p>
</div>
             ))}
</div>
<form className="chatbot-input-container" onSubmit={sendMessage}>
<button type="button" onClick={() => fileInputRef.current.click()} className="chatbot-attach-button">
<Paperclip size={20} />
</button>
<input type="file" ref={fileInputRef} style={{ display: "none" }} />
<input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Type a message..."
               className="chatbot-input"
             />
<button className="chatbot-mic-button">
<Mic size={20} />
</button>
<button type="submit" className="chatbot-send-button">
<Send size={20} />
</button>
</form>
</div>
       ) : isMinimized ? (
<button className="chatbot-float-button" onClick={restoreChatbot}>
<MessageCircle size={32} />
</button>
       ) : (
<button className="chatbot-float-button" onClick={handleChatbotToggle}>
<MessageCircle size={32} />
</button>
       )}
</div>
</div>
 );
};
export default Chatbot;