import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";
import Chatbot from "./chatbotmain";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
 const [userName, setUserName] = useState(localStorage.getItem("userName") || null);
 const [dropdownOpen, setDropdownOpen] = useState(false); 

 useEffect(() => {
   const handleStorageChange = () => {
     const storedName = localStorage.getItem("userName");
     setUserName(storedName);
   };
   window.addEventListener("storage", handleStorageChange);
   return () => {
     window.removeEventListener("storage", handleStorageChange);
   };
 }, []);
 const handleLogout = () => {
   localStorage.removeItem("accessToken");
   localStorage.removeItem("userName");
   setUserName(null);
   window.location.href = "/";
 };
 return (
<Router>
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
<div className="app-container">

<header className="full-page-header">
<h1 className="logo">Xfinity</h1>
<nav className="nav-links">
<Link to="/">Home</Link>
<Link to="/services">Services</Link>
<Link to="/support">Support</Link>
<Link to="/contact">Contact</Link>
             
             {!userName ? (
<>
<Link to="/signin" className="nav-signin">Sign In</Link>
</>
             ) : (
              
<div className="user-dropdown">
<button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                   Hello, {userName}
</button>
                 {dropdownOpen && (
<div className="dropdown-menu">
<button className="dropdown-item logout-btn">My Profile</button>
<button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
</div>
                 )}
</div>
             )}
</nav>
</header>

<Routes>
<Route path="/" element={
<motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
<motion.h1 className="xfinity-title" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2}}>
                 Welcome to Xfinity !
</motion.h1>
<motion.h3 className="xfinity-caption" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2 }}>
                 Experience the Future of Connectivity with Xfinity
</motion.h3>

<motion.section className="features-container" initial={{ scale: 0.9,opacity: 0 }} animate={{ scale: 1,opacity: 1 }} transition={{ duration: 2 }}>
<div className="feature-card">
<h3>🚀Xfinity Internet</h3>
<p>Experience lightning-speed broadband perfect for work-from-home setups.</p>
</div>
<div className="feature-card">
<h3>📺Xfinity X1</h3>
<p>Stream live TV, on-demand movies and your favourite apps-all in one place, just for you!</p>
</div>
<div className="feature-card">
<h3>💬 24/7 Customer Support</h3>
<p>Need help? Dont you worry. We are always here to help, anytime you need.</p>
</div>
</motion.section>
</motion.div>
           } />
<Route path="/signin" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />
</Routes>

<footer className="full-page-footer">&copy; 2025 Xfinity. All rights reserved.</footer>

<Chatbot />
</div>
</motion.div>
</Router>
 );
}
export default App;