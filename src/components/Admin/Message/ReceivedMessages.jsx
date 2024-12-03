import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://127.0.0.1:5000/api/chat/messages";

const ReceivedMessages = () => {
  const { user } = useAuth(); // Access the current logged-in user
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [userID, setUserID] = useState(null); // Initialize as null
  const [sortOrder, setSortOrder] = useState("desc");

  console.log("User detected:", user);

  useEffect(() => {
    if (user?.UniqeID) {
      setUserID(user.UniqeID); // Set userID when user is defined
    } else {
      console.warn("User or UniqeID is undefined!");
    }
  }, [user]); // Depend on user to update userID

  useEffect(() => {
    if (userID) {
      fetchMessages();
    }
  }, [sortOrder, userID]); // Depend on userID and sortOrder for fetching messages

  const fetchMessages = async () => {
    try {
      console.log("Fetching messages for user:", userID);
      const response = await axios.get(API_URL, {
        params: { sort_order: sortOrder },
      });
      console.log("Full API response:", response);

      const { messages: apiMessages } = response.data || {};
      if (!apiMessages) {
        console.error("API response does not contain 'messages'");
        return;
      }

      console.log("API Messages before filtering:", apiMessages);
      const receivedMessages = apiMessages.filter(
        (msg) => msg.receiver_id === userID
      );
      console.log("Filtered Messages:", receivedMessages);
      setMessages(receivedMessages);
    } catch (error) {
      console.error(
        "Error fetching received messages:",
        error.response?.data || error.message
      );
    }
  };

  const openMessage = async (messageId) => {
    try {
      console.log("Fetching message details for messageId:", messageId);
      const response = await axios.get(`${API_URL}/${messageId}`);
      console.log("Selected message details:", response.data);
      setSelectedMessage(response.data);
    } catch (error) {
      console.error(
        "Error fetching message details:",
        error.response?.data || error.message
      );
    }
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  const handleDownloadAttachment = async (messageId) => {
    try {
      console.log("Downloading attachment for messageId:", messageId);
      const response = await axios.get(`${API_URL}/${messageId}/attachment`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const filename =
        response.headers["content-disposition"]?.split("filename=")[1]?.replace(/"/g, "") ||
        "attachment";

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error("Error downloading attachment:", error.response?.data || error.message);
      alert("An error occurred while downloading the attachment.");
    }
  };

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Received Messages</h2>
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

export default ReceivedMessages;
