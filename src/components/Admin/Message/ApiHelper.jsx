import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/chat";

export const sendMessage = async (messageData, attachment, currentUserID) => {
  if (!currentUserID || currentUserID !== messageData.sender_id) {
    throw new Error("Sender is not authenticated or does not match the current user.");
  }

  const formData = new FormData();
  formData.append("sender_id", messageData.sender_id);
  formData.append("sender_type", messageData.sender_type);
  formData.append("receiver_id", messageData.receiver_id);
  formData.append("receiver_type", messageData.receiver_type);
  formData.append("subject", messageData.subject);
  formData.append("body", messageData.body);
  if (attachment) {
    formData.append("attachment", attachment);
  }

  try {
    const response = await axios.post(`${API_URL}/send`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message", error);
    throw error;
  }
};

export const getReceivedMessages = async (currentUserID) => {
  if (!currentUserID) {
    throw new Error("User is not authenticated or missing ID.");
  }

  try {
    const response = await axios.get(`${API_URL}/messages`);
    const messages = response.data.messages;

    // Filter messages for the current user
    const filteredMessages = messages.filter(
      (msg) => msg.receiver_id === currentUserID || msg.sender_id === currentUserID
    );

    return filteredMessages;
  } catch (error) {
    console.error("Error fetching received messages", error);
    throw error;
  }
};

export const getAllMessages = async (sortOrder = "desc", currentUserID) => {
  if (!currentUserID) {
    throw new Error("User is not authenticated or missing ID.");
  }

  try {
    const response = await axios.get(`${API_URL}/messages?sort_order=${sortOrder}`);
    const messages = response.data.messages;

    // Filter messages for the current user
    const filteredMessages = messages.filter(
      (msg) => msg.receiver_id === currentUserID || msg.sender_id === currentUserID
    );

    return filteredMessages;
  } catch (error) {
    console.error("Error fetching all messages", error);
    throw error;
  }
};

export const getMessage = async (messageId, currentUserID) => {
  if (!currentUserID) {
    throw new Error("User is not authenticated or missing ID.");
  }

  try {
    const response = await axios.get(`${API_URL}/message/${messageId}`);
    const message = response.data;

    // Allow only if the user is the sender or receiver
    if (message.sender_id !== currentUserID && message.receiver_id !== currentUserID) {
      throw new Error("Unauthorized to view this message.");
    }

    return message;
  } catch (error) {
    console.error("Error fetching message", error);
    throw error;
  }
};

export const downloadAttachment = async (messageId, currentUserID) => {
  if (!currentUserID) {
    throw new Error("User is not authenticated or missing ID.");
  }

  try {
    const response = await axios.get(
      `${API_URL}/message/${messageId}/attachment`,
      { responseType: "blob" }
    );

    const message = await getMessage(messageId, currentUserID);

    // Ensure user has access to download attachment
    if (message.sender_id !== currentUserID && message.receiver_id !== currentUserID) {
      throw new Error("Unauthorized to download this attachment.");
    }

    const blob = new Blob([response.data]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    const filename =
      response.headers["content-disposition"]?.split("filename=")[1] ||
      "attachment";
    link.download = filename.replace(/"/g, "");
    link.click();
  } catch (error) {
    console.error("Error downloading attachment", error);
    throw error;
  }
};
