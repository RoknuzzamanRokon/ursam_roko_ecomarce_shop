import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Correct import for jwtDecode

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState(null);

  // Function to fetch user details using user_id
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userId}/`
      );
      const data = await response.json();
      return data; // Should return user details like username, email, etc.
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

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
      const decodedToken = jwtDecode(data.access);
      const userDetails = await fetchUserDetails(decodedToken.user_id); // Fetch user details
      if (userDetails) {
        setUser(userDetails); // Set user details in the state
        setAuthTokens(data);
        localStorage.setItem("authTokens", JSON.stringify(data));
        return true;
      }
    }
    return false;
  };

  const googleLoginUser = (googleUserData) => {
    setUser(googleUserData); // Set Google user data to user state
    localStorage.setItem("googleUser", JSON.stringify(googleUserData)); // Store Google user in localStorage
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("googleUser");
  };

  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    const googleUser = localStorage.getItem("googleUser");

    if (tokens) {
      const decodedToken = jwtDecode(JSON.parse(tokens).access);
      fetchUserDetails(decodedToken.user_id).then((userDetails) => {
        if (userDetails) {
          setUser(userDetails);
        }
      });
      setAuthTokens(JSON.parse(tokens));
    } else if (googleUser) {
      setUser(JSON.parse(googleUser));
    }
  }, []);

  const contextData = {
    user, // This now contains full user details
    authTokens,
    loginUser,
    googleLoginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}