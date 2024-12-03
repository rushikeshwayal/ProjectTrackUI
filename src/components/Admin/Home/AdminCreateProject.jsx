import { useState, useEffect } from 'react';
import axios from 'axios';
import MinistryLogos from '../../Common/MinistryLogos'; // Ministry Logos component
import SideNavBarAdmin from './SideNavBarAdmin'; // Sidebar component
import { Link } from 'react-router-dom';

function AdminCreateProject() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle
  
  const [formData, setFormData] = useState({
    project_name: '',
    approval_date: '',
    investigator_id: '',
    sub_agency_id: '',
    agency_id: '',
    sub_investigator_id: '',
    project_type: '',
    project_start_date: '',
    project_end_date: '',
    project_coordinator_id: '',
    project_description: '',
  });

  const [agencies, setAgencies] = useState([]);
  const [subAgencies, setSubAgencies] = useState([]);
  const [investigators, setInvestigators] = useState([]);
  const [subInvestigators, setSubInvestigators] = useState([]);
  const [projectCoordinators, setProjectCoordinators] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch foreign key data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [agencyRes, subAgencyRes, investigatorRes, subInvestigatorRes, projectCoordinatorRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/agency'),
          axios.get('http://127.0.0.1:5000/api/sub_agency'),
          axios.get('http://127.0.0.1:5000/api/investigator'),
          axios.get('http://127.0.0.1:5000/api/sub_investigator'),
          axios.get('http://127.0.0.1:5000/api/project-coordinator'),
        ]);

        setAgencies(agencyRes.data);
        setSubAgencies(subAgencyRes.data);
        setInvestigators(investigatorRes.data);
        setSubInvestigators(subInvestigatorRes.data);
        setProjectCoordinators(projectCoordinatorRes.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
        setErrorMessage('Failed to fetch dropdown data.');
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/post/project', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Project created successfully!');
      setSuccessMessage('Project created successfully!');
      setFormData({
        project_name: '',
        approval_date: '',
        investigator_id: '',
        sub_agency_id: '',
        agency_id: '',
        sub_investigator_id: '',
        project_type: '',
        project_start_date: '',
        project_end_date: '',
        project_coordinator_id: '',
        project_description: '',
      });
    } catch (error) {
      console.error('Error creating project:', error);
      setErrorMessage('Failed to create project.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Ministry Logos */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <MinistryLogos />
      </div>

      {/* Sidebar */}
      <div className={`mt-[100px] rounded-md transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SideNavBarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className={`transition-all duration-300 ml-${isSidebarOpen ? '80' : '20'} mt-[120px] p-8 flex-grow`}>

      <div
  id="otherform"
  className={`gap-5 w-full flex justify-center flex-row p-10 transition-all duration-300
     ${
    isSidebarOpen ? 'ml-[0px]' : 'ml-[0px]'
  }`
  }
>
  <Link
    to="/create/agency"
    className="text-purple-700 bg-gray-100 hover:bg-purple-50 border border-purple-700 transition-all duration-300 px-8 text-sm py-3 rounded-lg shadow-md hover:shadow-lg"
  >
    Create New Agency
  </Link>
  <Link
    to="/create/sub-agency"
    className="text-purple-700 bg-gray-100 hover:bg-purple-50 border border-purple-700 transition-all duration-300 text-sm px-8 py-3 rounded-lg shadow-md hover:shadow-lg"
  >
    Create New Sub-Agency
  </Link>
  <Link
    to="/create/investigator"
    className="text-purple-700 bg-gray-100 hover:bg-purple-50 border border-purple-700 transition-all duration-300 text-sm px-8 py-3 rounded-lg shadow-md hover:shadow-lg"
  >
    Create New Investigator
  </Link>
  <Link
    to="/create/sub-investigator"
    className="text-purple-700 bg-gray-100 hover:bg-purple-50 border border-purple-700 transition-all duration-300 text-sm px-8 py-3 rounded-lg shadow-md hover:shadow-lg"
  >
    Create New Sub-Investigator
  </Link>
</div>


        <h1 className="text-4xl font-bold text-purple-800 mb-6">Create New Project</h1>

        {/* Project Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-gray-700 font-medium">Project Name</label>
            <input
              type="text"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          {/* Dropdowns */}
          <div>
            <label className="block text-gray-700 font-medium">Agency</label>
            <select
              name="agency_id"
              value={formData.agency_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Agency</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.agency_id}>
                  {agency.agency_id}. {agency.agency_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Sub-Agency</label>
            <select
              name="sub_agency_id"
              value={formData.sub_agency_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Sub-Agency</option>
              {subAgencies.map((subAgency) => (
                <option key={subAgency.id} value={subAgency.sub_agency_id}>
                  {subAgency.sub_agency_id}.{subAgency.sub_agency_name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-gray-700 font-medium">Investigator</label>
            <select
              name="investigator_id"
              value={formData.investigator_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Investigator</option>
              {investigators.map((investigator) => (
                <option key={investigator.id} value={investigator.investigator_id}>
                  {investigator.investigator_id}. {investigator.investigator_name}
                </option>
              ))}
            </select>
          </div>
  {/* == */}
          <div>
            <label className="block text-gray-700 font-medium">Sub-Investigator</label>
            <select
              name="sub_investigator_id"
              value={formData.sub_investigator_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Sub-Investigator</option>
              {subInvestigators.map((sub_investigator) => (
                <option key={sub_investigator.id} value={sub_investigator.sub_investigator_id}>
                  {sub_investigator.sub_investigator_id}. {sub_investigator.sub_investigator_name}
                </option>
              ))}
            </select>
          </div>
          {/* == */}
          <div>
            <label className="block text-gray-700 font-medium">Project Coordinator</label>
            <select
              name="project_coordinator_id"
              value={formData.project_coordinator_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Project Coordinator</option>
              {projectCoordinators.map((projectCoordinator) => (
                <option key={projectCoordinator.id} value={projectCoordinator.coordinator_id}>
                  {projectCoordinator.coordinator_id}. {projectCoordinator.coordinator_name}
                </option>
              ))}
            </select>
          </div>

          {/* <div>
            <label className="block text-gray-700 font-medium">
              Project Type
            </label>
            <input
              type="text"
              name="project_type"
              value={formData.project_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="e.g., Research, Development"
              required
            />
          </div> */}
          <div>
            <label className="block text-gray-700 font-medium">Project Type</label>
            <select
              name="project_type"
              value={formData.project_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="">Select Project Type</option>
              <option value="R&D">R&D</option>
              <option value="S&T">S&T</option>
            </select>
          </div>

          {/* Project Start Date */}
          <div>
            <label className="block text-gray-700 font-medium">
              Project Start Date
            </label>
            <input
              type="date"
              name="project_start_date"
              value={formData.project_start_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          {/* Project End Date */}
          <div>
            <label className="block text-gray-700 font-medium">
              Project End Date
            </label>
            <input
              type="date"
              name="project_end_date"
              value={formData.project_end_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
              style={{ textTransform: 'uppercase' }}
            />
          </div>
          {/* Project Description */}
<div>
  <label className="block text-gray-700 font-medium">
    Project Description
  </label>
  <textarea
    name="project_description"
    value={formData.project_description}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-md resize-none"
    placeholder="Provide a brief description of the project..."
    rows="4"
    maxLength="500"
    required
  ></textarea>
  <p className="text-sm text-gray-500">
    Maximum 500 characters.
  </p>
</div>

         

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Project'}
          </button>

         {/* Success/Error Messages */}
{successMessage && (
  <div className="fixed top-5 right-5 px-6 py-4 bg-green-100 border border-green-400 text-green-800 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-slide-in-out">
    <p className="text-lg font-medium">{successMessage}</p>
  </div>
)}

{errorMessage && (
  <div className="fixed top-5 right-5 px-6 py-4 bg-red-100 border border-red-400 text-red-800 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-slide-in-out">
    <p className="text-lg font-medium">{errorMessage}</p>
  </div>
)}

<style>
  {`
    @keyframes slide-in-out {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      20% {
        transform: translateX(0);
        opacity: 1;
      }
      80% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    .animate-slide-in-out {
      animation: slide-in-out 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  `}
</style>


        
        </form>
      </div>
      {/* <style>
        .placeholder-uppercase::placeholder {
          text-transform:uppercase;
        }
      </style> */}
    </div>
  );
}

export default AdminCreateProject;
