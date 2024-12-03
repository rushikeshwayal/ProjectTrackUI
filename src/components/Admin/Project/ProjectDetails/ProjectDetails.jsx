import { useParams } from 'react-router-dom';
import { useState } from 'react';
import MinistryLogos from '../../../Common/MinistryLogos';
import SideNavBarAdmin from '../../Home/SideNavBarAdmin';
import ProjectDetailsSection from './ProjectDetailsSection'; 
import OrganizationDetailsSection from './OrganizationDetailsSection';
import InvestigatorDetailsSection from './InvestigatorDetailsSection';
import SubInvestigatorDetailsSection from './SubInvestigatorDetailsSection';
import ProjectCoordinatorDetailsSection from './ProjectCoordinatorDetailsSection';

const ProjectDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [activeTab, setActiveTab] = useState('ProjectDetails'); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-40">
        <MinistryLogos />
      </div>

      {/* Sidebar - left side */}
      <div className={`mt-[100px] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SideNavBarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className={`flex-grow transition-all duration-300 mt-[120px] p-8 bg-gray-100 ${isSidebarOpen ? 'ml-80' : 'ml-16'}`}>
 


        <div className="mt-4 bg-white rounded-lg shadow-lg">
          <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-300">
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('ProjectDetails')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'ProjectDetails' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Project Details
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('OrganizationDetails')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'OrganizationDetails' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Organization Details
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('InvestigatorDetails')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'InvestigatorDetails' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Investigator Details
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('SubInvestigatorDetails')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'SubInvestigatorDetails' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Sub Investigator Details
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('CoordinatorDetails')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'CoordinatorDetails' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Coordinator Details
              </button>
            </li>
            <li className="mr-2">
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
                Report
              </button>
            </li>
          </ul>

          {/* Render respective sections based on active tab */}
          {activeTab === 'ProjectDetails' && <ProjectDetailsSection />}
          {activeTab === 'OrganizationDetails' && <OrganizationDetailsSection />}
          {activeTab === 'InvestigatorDetails' && <InvestigatorDetailsSection />}
          {activeTab === 'SubInvestigatorDetails' && <SubInvestigatorDetailsSection/>}
          {activeTab === 'CoordinatorDetails' && <ProjectCoordinatorDetailsSection />}
          {activeTab === 'Statistics' && <h1>Statistics</h1> }
          {activeTab === 'AuditReport' && <h1>Audit Report</h1> }
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
