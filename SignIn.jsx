import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import {  X } from "lucide-react";
const SignIn = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch("http://127.0.0.1:5000/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ email, password }),
     });
     const data = await response.json();
     if (response.ok) {
       localStorage.setItem("accessToken", data.access_token);
       localStorage.setItem("userName", data.name);
       window.dispatchEvent(new Event("storage"));
       navigate("/"); 
     } else {
       setErrorMessage("Invalid credentials. Please try again.");
     }
   } catch (error) {
     console.error("Error:", error);
     setErrorMessage("Something went wrong. Please try again later.");
   }
 };


 return (
<div className="auth-container">
<div className="auth-box">
<h2>Sign In</h2>

<form onSubmit={handleSubmit}>
<div className="input-group">
<label>Email</label>
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
</div>
<div className="input-group">
<label>Password</label>
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
</div>
<button type="submit" className="auth-btn">Sign In</button>
</form>
       
       {errorMessage && <p className="auth-message error">{errorMessage}</p>}

<div className="auth-links">
<p> <span className="link" onClick={() => navigate("/signup")}>Don't have an account? Create an account here.</span></p>
</div>
</div>
</div>
 );
};
export default SignIn;