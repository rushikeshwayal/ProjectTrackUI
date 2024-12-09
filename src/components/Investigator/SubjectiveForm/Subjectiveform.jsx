import { useState } from 'react';
import MinistryLogos from '../../Common/MinistryLogos';
import SideNavBarAdmin from '../Home/SideNavBarInvestigator';


const SubjectiveForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('UserDetails'); // Default to the first tab

  // Handles tab click and sets the state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen">
      {/* Top Logo Section */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <MinistryLogos />
      </div>
      <div>
        {/* Navigation */}
        <div className="mt-4 bg-white rounded-lg shadow-lg">
          <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-300">
            {/* Tab Items */}
            {[
              { key: 'UserDetails', label: 'FORM-I' },
              { key: 'Feedback', label: 'FORM-II' },
              { key: 'SurveyDetails', label: 'FORM-III' },
              { key: 'Analysis', label: 'FORM-IV' },
              { key: 'Notifications', label: 'FORM-V' },
              { key: 'Reports', label: 'FORM-VI' },
              { key: 'FormVII', label: 'FORM-VII' },
              { key: 'FormVIII', label: 'FORM-VIII' },
              { key: 'FormIX', label: 'FORM-IX' },
              { key: 'FormX', label: 'FORM-X' },
              { key: 'FormXI', label: 'FORM-XI' },
              { key: 'FormXII', label: 'FORM-XII' },
              { key: 'FormXIII', label: 'FORM-XIII' },
            ].map((item) => (
              <li key={item.key} className="mr-2">
                <button
                  onClick={() => handleTabClick(item.key)}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === item.key
                      ? 'text-purple-600 bg-white border-b-2 border-purple-600'
                      : 'hover:text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Render corresponding sections */}
          <div className="p-4">
            {activeTab === 'UserDetails' && <h1>Form Info - FORM-I_NEW</h1>}
            {activeTab === 'Feedback' && <h1>Form Info - FORM-II_NEW</h1>}
            {activeTab === 'SurveyDetails' && <h1>Form Info - FORM-III_NEW</h1>}
            {activeTab === 'Analysis' && <h1>Form Info - FORM-IV_NEW</h1>}
            {activeTab === 'Notifications' && <h1>Form Info - FORM-V_NEW</h1>}
            {activeTab === 'Reports' && <h1>Form Info - FORM-VI_NEW</h1>}
            {activeTab === 'FormVII' && <h1>Form Info - FORM-VII_NEW</h1>}
            {activeTab === 'FormVIII' && <h1>Form Info - FORM-VIII_NEW</h1>}
            {activeTab === 'FormIX' && <h1>Form Info - FORM-IX_NEW</h1>}
            {activeTab === 'FormX' && <h1>Form Info - FORM-X_NEW</h1>}
            {activeTab === 'FormXI' && <h1>Form Info - FORM-XI_NEW</h1>}
            {activeTab === 'FormXII' && <h1>Form Info - FORM-XII_NEW</h1>}
            {activeTab === 'FormXIII' && <h1>Form Info - FORM-XIII_NEW</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectiveForm;
