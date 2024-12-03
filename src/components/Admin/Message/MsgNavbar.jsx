import React from "react";
import { Link } from "react-router-dom";
import { useAuth ,AuthProvider } from "../../context/AuthContext";
const MsgNavbar = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <nav>
      <ul>
        <li><Link to="/send-message">Send Message</Link></li>
        <li><Link to="/received-messages">Received Messages</Link></li>
        <li><Link to="/all-messages">All Messages</Link></li>
      </ul>
    </nav>
  );
};

export default MsgNavbar;
