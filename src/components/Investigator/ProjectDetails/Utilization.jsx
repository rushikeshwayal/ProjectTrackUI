import { useParams } from 'react-router-dom';
import { useState } from 'react';

import AddFundUtilization from './FundUtilisation';
import FundUtilizationReport from './GetFundUtilization';

const Utilize = () => {
  const { projectId } = useParams(); // Extract projectId from URL params
  const [activeTab, setActiveTab] = useState('UploadFundUtilization');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-lg">
      <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-300">
        {/* First Tab */}
        <li className="mr-2">
          <button
            onClick={() => handleTabClick('UploadFundUtilization')}
            className={`inline-block p-4 rounded-t-lg ${
              activeTab === 'UploadFundUtilization'
                ? 'text-purple-600 bg-white border-b-2 border-purple-600'
                : 'hover:text-gray-600 hover:bg-gray-200'
            }`}
          >
            Upload Fund Utilization Report
          </button>
        </li>
        
        {/* Second Tab */}
        <li className="mr-2">
          <button
            onClick={() => handleTabClick('PastFundUtilization')}
            className={`inline-block p-4 rounded-t-lg ${
              activeTab === 'PastFundUtilization'
                ? 'text-purple-600 bg-white border-b-2 border-purple-600'
                : 'hover:text-gray-600 hover:bg-gray-200'
            }`}
          >
            Past Fund Utilization Report
          </button>
        </li>
      </ul>

      {/* Dynamic rendering based on active tab */}
      {activeTab === 'UploadFundUtilization' && <AddFundUtilization />}
      {activeTab === 'PastFundUtilization' && <FundUtilizationReport projectId={projectId} />}
    </div>
  );
};

export default Utilize;
