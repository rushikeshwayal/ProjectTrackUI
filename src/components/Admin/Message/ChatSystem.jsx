import { useState } from 'react';
import MinistryLogos from '../../Common/MinistryLogos'; // Replace this if necessary
import SideNavBar from '../../Admin/Home/SideNavBarAdmin'; // Replace this with your sidebar component
import AllMessages from './AllMessages';
import SendMessage from './SendMessage';
import ReceivedMessages from './ReceivedMessages';


const ChatSystem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Chat');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-40">
        <MinistryLogos /> {/* Replace this with your branding component */}
      </div>

      {/* Sidebar - left side */}
      <div className={`mt-[100px] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SideNavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className={`flex-grow transition-all duration-300 mt-[120px] p-8 bg-gray-100 ${isSidebarOpen ? 'ml-80' : 'ml-16'}`}>
        <div className="mt-4 bg-white rounded-lg shadow-lg">
          <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-300">
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('Chat')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'Chat' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Chat
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('AllMessages')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'AllMessages' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                All Messages
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('SentMessages')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'SentMessages' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Sent Messages
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('ReceivedMessages')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'ReceivedMessages' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Received Messages
              </button>
            </li>
            
            {/* <li className="mr-2">
              <button
                onClick={() => handleTabClick('Statistics')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'Statistics' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Statistics
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('AuditReport')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'AuditReport' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Audit Report
              </button>
            </li> */}
          </ul>
          {activeTab === 'AllMessages' && <AllMessages />}
          {/* {activeTab === 'Chat' && <ChatSection />} */}
          {activeTab === 'SentMessages' && <SendMessage />}
          {activeTab === 'ReceivedMessages' && <ReceivedMessages />}
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
