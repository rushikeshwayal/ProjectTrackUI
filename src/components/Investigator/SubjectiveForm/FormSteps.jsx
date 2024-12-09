import { useParams } from 'react-router-dom';
import { useState } from 'react';
import MinistryLogos from '../../Common/MinistryLogos';
import SideNavBarAdmin from '../Home/SideNavBarInvestigator';
import SubjectiveForm from './Subjectiveform';
import FileUploadForm from './UploadForm';  
const FormStep = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [activeTab, setActiveTab] = useState('FormStep'); 

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
                onClick={() => handleTabClick('FileDetails')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'FileDetails' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                File Details 
              </button>
            </li>
            
            <li className="mr-2">
              <button
                onClick={() => handleTabClick('UploadFile')}
                className={`inline-block p-4 rounded-t-lg ${activeTab === 'UploadFile' ? 'text-purple-600 bg-white border-b-2 border-purple-600' : 'hover:text-gray-600 hover:bg-gray-200'}`}
              >
                Upload File
              </button>
            </li>
          </ul>
          {activeTab === 'FileDetails' && <SubjectiveForm />}
          {activeTab === 'UploadFile' && <FileUploadForm />}
        </div>
      </div>
    </div>
  );
};

export default FormStep;
