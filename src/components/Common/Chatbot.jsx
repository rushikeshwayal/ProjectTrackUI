// src/components/Chatbot.js
import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Adding the chatbot configuration script
    window.embeddedChatbotConfig = {
      chatbotId: "sx90nZ54r2lJvM6tSciK_",
      domain: "www.chatbase.co"
    };
    
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    document.body.appendChild(script);
    
    // Cleanup the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div id="chatbase-widget" className="bg-white shadow-lg rounded-full">
        {/* Chatbot widget will be automatically inserted here by Chatbase */}
      </div>
    </div>
  );
};

export default Chatbot;
