import { useState } from 'react';
import MinistryLogos from "../../Common/MinistryLogos";
import SideNavBarAdmin from "./SideNavBarAdmin";
import NavBar from './NavBar'; // Importing NavBar for profile and notification icons
import RDProjects from '../Project/R&DProjects'; // Import R&D Projects Component
import STProjects from '../Project/STProjects';   // Import S&T Projects Component

function HomeAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state
  const [activeTab, setActiveTab] = useState('rd'); // Default to R&D tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Ministry Logos - top section */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <MinistryLogos />
      </div>

      {/* Sidebar - left side */}
      <div className={`mt-[100px] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SideNavBarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Profile and Notification NavBar - top-right corner */}
      <NavBar />

      {/* Main content area */}
      <div className={`transition-all duration-300 flex-grow mt-40 p-4 ${isSidebarOpen ? 'ml-80' : 'ml-16'} mt-[120px]`}>
        <h1 className="text-2xl font-bold">Welcome to Pragati.Track</h1>
        <p className="text-gray-500">Admin Console</p>
        
        {/* Tabbed Interface for R&D and S&T */}
        <div className="mt-4 bg-white rounded-lg shadow-lg">
          <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-300">
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('rd')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'rd' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                R&D Projects
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('st')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'st' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                S&T Projects
              </button>
            </li>
          </ul>

          {/* Render R&D or S&T Projects based on active tab */}
          {activeTab === 'rd' && <RDProjects />}
          {activeTab === 'st' && <STProjects />}
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
