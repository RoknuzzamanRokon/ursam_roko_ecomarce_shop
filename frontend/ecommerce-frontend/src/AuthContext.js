import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens) {
      const decodedToken = jwtDecode(JSON.parse(tokens).access);
      return decodedToken;
    }
    return null;
  });

  // Regular login function
  const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  };

  // Google login function
  const googleLoginUser = (googleUserData) => {
    // Assuming `googleUserData` contains user information returned from Google.
    // If you want to handle tokens provided by Google, you could store and use them similarly to `authTokens`.
    setUser(googleUserData);
    localStorage.setItem("googleUser", JSON.stringify(googleUserData)); // Store user info locally
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("googleUser"); // Also remove Google user info if logged in via Google
  };

  // Load Google or JWT user on initialization
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    const googleUser = localStorage.getItem("googleUser");

    if (tokens) {
      setAuthTokens(JSON.parse(tokens));
      setUser(jwtDecode(JSON.parse(tokens).access));
    } else if (googleUser) {
      setUser(JSON.parse(googleUser)); // Load Google user if they are logged in
    } else {
      setUser(null);
    }
  }, []);

  const contextData = {
    user,
    authTokens,
    loginUser,
    googleLoginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
