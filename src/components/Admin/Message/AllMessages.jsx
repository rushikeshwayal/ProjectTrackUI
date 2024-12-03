import React, { useState, useEffect } from "react";
import axios from "axios";
import MsgNavbar from "./MsgNavbar";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://127.0.0.1:5000/api/chat";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const { user } = useAuth();

  useEffect(() => {
    if (user?.UniqeID) {
      fetchMessages();
    }
  }, [sortOrder, user]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages?sort_order=${sortOrder}`);
      const allMessages = response.data.messages;
      
      // Filter messages for the current user
     
      const filteredMessages = allMessages.filter(
        (msg) => msg.sender_id === user.UniqeID || msg.receiver_id === user.UniqeID
      );
     

      console.log("Filtered messages:", filteredMessages);  
      setMessages(filteredMessages);
    } catch (error) {
      console.error("Error fetching all messages", error.response?.data || error.message);
    }
  };

  const openMessage = async (messageId) => {
    try {
      const response = await axios.get(`${API_URL}/message/${messageId}`);
      setSelectedMessage(response.data);
    } catch (error) {
      console.error("Error fetching message details", error.response?.data || error.message);
    }
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDownloadAttachment = async (messageId) => {
    try {
      const response = await axios.get(`${API_URL}/message/${messageId}/attachment`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const filename =
        response.headers["content-disposition"]?.match(/filename="?(.+)"?/)?.[1] || "attachment";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading attachment", error.response?.data || error.message);
    }
  };

  const handleViewAttachment = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      alert("File preview not available.");
    }
  };

  return (
    <div className="p-8">
      <MsgNavbar />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Messages</h2>
        <button
          onClick={handleSortChange}
          className="px-4 py-2 bg-purple-500 text-white rounded-md shadow-md"
        >
          Sort by Date ({sortOrder === "asc" ? "Oldest" : "Newest"})
        </button>
      </div>
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li
            key={msg.message_id}
            className="p-4 bg-white shadow rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => openMessage(msg.message_id)}
          >
            <h3 className="text-lg font-medium">{msg.subject}</h3>
            <p className="text-gray-600">{msg.body.slice(0, 50)}...</p>
            <small className="text-gray-500">
              {new Date(msg.timestamp).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4">
            <button
              onClick={closeMessage}
              className="absolute top-[30px] right-36 bg-red-500 text-xl text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
            >
              Close
            </button>
            <h3 className="text-xl font-semibold">{selectedMessage.subject}</h3>
            <p className="my-4">{selectedMessage.body}</p>
            {selectedMessage.attachment_name && (
              <div className="space-x-4">
                <button
                  onClick={() => handleDownloadAttachment(selectedMessage.message_id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
                >
                  Download Attachment ({selectedMessage.attachment_name})
                </button>
                <button
                  onClick={() => handleViewAttachment(selectedMessage.attachment_url)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
                >
                  View Attachment
                </button>
              </div>
            )}
            <div className="mt-4 text-sm text-gray-500">
              Sent: {new Date(selectedMessage.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMessages;
