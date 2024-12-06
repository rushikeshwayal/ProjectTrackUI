import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import MinistryLogos from "../../Common/MinistryLogos";

const API_URL = "http://127.0.0.1:5000/api/chat/messages";

const InvestigatorNotification = () => {
  const { user } = useAuth(); // Access the current logged-in user
  const [messages, setMessages] = useState([]);
  const [dismissedMessageIds, setDismissedMessageIds] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (user?.UniqeID) {
      setUserID(user.UniqeID);
      const savedDismissed = JSON.parse(localStorage.getItem("dismissedMessages")) || [];
      setDismissedMessageIds(savedDismissed);
    }
  }, [user]);

  useEffect(() => {
    if (userID) {
      fetchMessages();
    }
  }, [userID]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: { receiver_id: userID },
      });

      const { messages: apiMessages } = response.data || {};
      if (!apiMessages) {
        console.error("API response does not contain 'messages'");
        return;
      }

      // Filter out dismissed messages and messages sent by the user
      const filteredMessages = apiMessages.filter(
        (msg) =>
          !dismissedMessageIds.includes(msg.message_id) &&
          msg.sender_id !== userID // Exclude messages sent by the user
      );

      setMessages(filteredMessages);
    } catch (error) {
      console.error("Error fetching received messages:", error.response?.data || error.message);
    }
  };

  const dismissAllNotifications = () => {
    const dismissedIds = messages.map((msg) => msg.message_id);
    const updatedDismissedIds = [...dismissedMessageIds, ...dismissedIds];
    setDismissedMessageIds(updatedDismissedIds);
    localStorage.setItem("dismissedMessages", JSON.stringify(updatedDismissedIds));
    setMessages([]); // Clear messages from the UI
  };

  return (
    <div className="p-8 mb-8">
      <div className="div">
        <MinistryLogos />
      </div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Recent Notifications</h2>
        <button
          onClick={dismissAllNotifications}
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md mt-4"
        >
          Dismiss All
        </button>
      </div>
      {messages.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">
          No new notifications.
        </p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.message_id}
              className="p-4 bg-white shadow rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <h3 className="text-lg font-medium">{msg.subject}</h3>
              <p className="text-gray-600">{msg.body.slice(0, 50)}...</p>
              <small className="text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvestigatorNotification;
