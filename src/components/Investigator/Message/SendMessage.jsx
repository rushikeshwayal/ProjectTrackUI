import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";


const SendMessage = () => {
  const { user } = useAuth(); // Get the current user from the Auth context
  const [formData, setFormData] = useState({
    sender_id: user?.UniqeID || "", // Set sender ID to the current user ID
    sender_type: "investigator", // Assuming sender type is admin
    receiver_id: "",
    receiver_type: "admin", // Now the receiver is an admin
    subject: "",
    body: "",
  });
  const [attachment, setAttachment] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [admins, setAdmins] = useState([]); // Store list of admins

  useEffect(() => {
    // Fetch all admins from the API
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/admin");
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for the API request
    const payload = new FormData();
    payload.append("sender_id", formData.sender_id);
    payload.append("sender_type", formData.sender_type);
    payload.append("receiver_id", formData.receiver_id);
    payload.append("receiver_type", formData.receiver_type);
    payload.append("subject", formData.subject);
    payload.append("body", formData.body);
    if (attachment) {
      payload.append("attachment", attachment);
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat/send", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("Message sent successfully.");
        // Clear the form fields after the message is sent
        setFormData({
          sender_id: user?.UniqeID || "",
          sender_type: "admin",
          receiver_id: "",
          receiver_type: "admin",
          subject: "",
          body: "",
        });
        setAttachment(null);
      } else {
        setResponseMessage(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("Failed to send message.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Send Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">Receiver ID</label>
          <select
            name="receiver_id"
            value={formData.receiver_id}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Admin</option>
            {admins.map((admin) => (
              <option key={admin.adminUniqe_id} value={admin.adminUniqe_id}>
                {admin.admin_name} - {admin.adminUniqe_id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Message Body</label>
          <textarea
            name="body"
            placeholder="Type your message here"
            value={formData.body}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="5"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Attach File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Send
          </button>
        </div>
      </form>

      {responseMessage && (
        <div
          className={`mt-6 p-4 text-center rounded-lg ${
            responseMessage.includes("Failed") ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
          }`}
        >
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default SendMessage;
