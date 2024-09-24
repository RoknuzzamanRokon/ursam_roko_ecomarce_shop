import React, { useEffect } from "react";
import "./style/Toast.css"; // Ensure this path matches your file structure

const Toast = ({ message, duration = 3000, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer); 
  }, [onDismiss, duration]);

  return <div className="toast">{message}</div>;
};

export default Toast;
