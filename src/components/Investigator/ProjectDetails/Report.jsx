import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateReport from './UpdateReport';
import GetReport from './GetReport';

const Report = () => {
  const { projectId } = useParams(); // Ensure the route has :projectId
  const [activeTab, setActiveTab] = useState('UpdateReport');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-lg">
      <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-300">
        <li className="mr-2">
          <button
            onClick={() => handleTabClick('UpdateReport')}
            className={`inline-block p-4 rounded-t-lg ${
              activeTab === 'UpdateReport'
                ? 'text-purple-600 bg-white border-b-2 border-purple-600'
                : 'hover:text-gray-600 hover:bg-gray-200'
            }`}
          >
            Update Report
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => handleTabClick('PastReports')}
            className={`inline-block p-4 rounded-t-lg ${
              activeTab === 'PastReports'
                ? 'text-purple-600 bg-white border-b-2 border-purple-600'
                : 'hover:text-gray-600 hover:bg-gray-200'
            }`}
          >
            Past Reports
          </button>
        </li>
      </ul>

      {activeTab === 'UpdateReport' && <UpdateReport />}
      {activeTab === 'PastReports' && <GetReport projectID={projectId} />}
    </div>
  );
};

export default Report;
