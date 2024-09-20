import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./style/Login.css";

// Input component for username and password
const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="input-group">
      <label>{label}:</label>
      <input type={type} value={value} onChange={onChange} required />
    </div>
  );
};

function Login() {
  const { loginUser, googleLoginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: handleGoogleLoginSuccess,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      {
        theme: "outline",
        size: "large",
        type: "standard",
        shape: "rectangular",
        logo_alignment: "left",
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (success) {
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const token = response.credential;
    const userObject = jwtDecode(token);
    googleLoginUser(userObject);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="divider">or</div>

      <div id="google-signin-button" className="google-button"></div>

      <div>
        I am new User. First < Link to="/register">Register</Link> here.
      </div>
    </div>
  );
}

export default Login;
