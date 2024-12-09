import { useParams } from 'react-router-dom';
import { useState } from 'react';
import GetReport from './GetReport';
import FundUtilizationReport from './GetFundUtilization';

const RRport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [activeTab, setActiveTab] = useState('RRport'); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="flex w-full ">
      {/* Main content area */}
        <div className="mt-4 bg-white rounded-lg ">
          <ul className="flex text-sm font-medium text-center text-gray-500 ">
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('ProjectDetails')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'ProjectDetails' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Project Report 
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('OrganizationDetails')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'OrganizationDetails' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Fund Utilization Report
              </button>
            </li>
          </ul>

          {/* Render respective sections based on active tab */}
          {activeTab === 'ProjectDetails' && <GetReport />}
          {activeTab === 'OrganizationDetails' && <FundUtilizationReport />}
        </div>
      </div>
  );
};

export default RRport;
