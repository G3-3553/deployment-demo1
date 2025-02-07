import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom"; 
import {  X } from "lucide-react";

const SignUp = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [message, setMessage] = useState(""); 
 const [isSignedUp, setIsSignedUp] = useState(false); 
 const navigate = useNavigate();
 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch("http://127.0.0.1:5000/signup", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ name, email, password }),
     });
     const data = await response.json();
     if (response.ok) {
       setMessage("Sign-Up Successful. Please log in.");
       setIsSignedUp(true); //
     } else {
       setMessage(data.error);
     }
   } catch (error) {
     console.error("Error:", error);
     setMessage("Something went wrong. Please try again.");
   }
 };
 return (
<div className="auth-container">
<div className="auth-box">
       {isSignedUp ? (
<div className="success-message">
<p className="auth-message">{message}</p>
<button className="auth-btn" onClick={() => navigate("/signin")}>
             Log In
</button>
</div>
       ) : (
<>
<h2>Sign Up</h2>

<form onSubmit={handleSubmit}>
<div className="input-group">
<label>Full Name</label>
<input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
</div>
<div className="input-group">
<label>Email</label>
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
</div>
<div className="input-group">
<label>Password</label>
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
</div>
<button type="submit" className="auth-btn">Sign Up</button>
</form>
</>
       )}
</div>
</div>
 );
};
export default SignUp;