import { useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ProjectDetailsSection = () => {
  const [reports, setReports] = useState([]);
  const {projectId} = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState({}); // Project details state
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state
  const [agency, setAgency] = useState({}); // Agency state
  const [subAgency, setSubAgency] = useState({}); // Sub-agency state
  const [investigator, setInvestigator] = useState({}); // Investigator state
  const [subInvestigator, setSubInvestigator] = useState({}); // Sub-investigator state
  const [coordinator, setCoordinator] = useState({}); // Coordinator state
console.log(projectId);
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try{
        const response = await axios.get(`http://127.0.0.1:5000/api/project/${projectId}`);
        setProject(response.data);
        const agencyResponse = await axios.get(`http://127.0.0.1:5000/api/agency/${response.data.agency_id}`);
        setAgency(agencyResponse.data);
        const subAgencyResponse = await axios.get(`http://127.0.0.1:5000/api/sub_agency/${response.data.sub_agency_id}`);
        setSubAgency(subAgencyResponse.data);
        const investigatorResponse = await axios.get(`http://127.0.0.1:5000/api/investigator/${response.data.investigator_id}`);
        setInvestigator(investigatorResponse.data);
        const subInvestigatorResponse = await axios.get(`http://127.0.0.1:5000/api/sub_investigator/${response.data.sub_investigator_id}`);
        setSubInvestigator(subInvestigatorResponse.data);
        const coordinatorResponse = await axios.get(`http://127.0.0.1:5000/api/project-coordinator/${response.data.project_coordinator_id}`);
        setCoordinator(coordinatorResponse.data);
      }
      catch(err){
        setError('Failed to fetch data');
      }
      finally{
        setLoading(false);
      }
  }
  fetchProjectDetails();
}, [projectId]);

if (loading) return <div>Loading...</div>;
if (error) return <div className="text-red-500">{error}</div>;


  // Sample data for milestones
  const milestones = [
    { title: 'Project Kickoff', date: '2023-01-01', description: 'Official start of the project with initial planning and discussions.', status: 'past' },
    { title: 'Initial Research Phase', date: '2023-03-01', description: 'Completion of the initial research phase with findings documented.', status: 'past' },
    { title: 'Prototype Development', date: '2023-06-01', description: 'Development of the prototype based on initial research.', status: 'past' },
    { title: 'Testing Phase', date: '2023-09-01', description: 'Testing the prototype with real users for feedback.', status: 'current' },
    { title: 'Final Development', date: '2024-01-01', description: 'Finalization of the product based on user feedback and testing results.', status: 'future' },
    { title: 'Launch', date: '2024-03-01', description: 'Official launch of the product to the market.', status: 'future' },
    { title: 'Post-Launch Evaluation', date: '2024-06-01', description: 'Evaluation and collection of feedback post-launch.', status: 'future' },
  ];

  const handleUploadReport = () => {
    // Logic for uploading the current report (to be implemented)
    alert('Upload report logic to be implemented');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      {/* Project Overview Section */}
      <div className="p-6">
      <h3 className="text-3xl font-bold mb-6 text-purple-700">Project Details</h3>
      {project ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-purple-700 mb-4">{project.project_name}</h3>
          <p><strong>Project Investigator:</strong> {investigator.investigator_name}</p>
          <p><strong>Project Co-ordinator:</strong> {coordinator.coordinator_name}</p>
          <p><strong>Project Sub-Investigator</strong>{subInvestigator.sub_investigator_name}</p>
          <p><strong>Implementing agency:</strong> {agency.agency_name}</p>
          <p><strong>Sub-Implementing agency:</strong> {subAgency.sub_agency_name}</p>
          <p><strong>Project Type:</strong> {project.project_type}</p>
          <p><strong>Status:</strong> {project.project_status}</p>
          <p><strong>Start Date:</strong> {project.project_start_date}</p>
          <p><strong>End Date:</strong> {project.project_end_date}</p>
          <p><strong>Project Category:</strong> {project.approval_date}</p>
          <p><strong>Description:</strong> {project.project_description}</p>
        </div>
      ) : (
        <div>No details available for this project</div>
      )}
    </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Project Timeline</h3>
        <div className="relative">
          <div className="flex flex-col">
            {/* Timeline Items */}
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center mb-8 relative">
                <div className="flex flex-col items-center">
                  <div className={`h-8 w-8 rounded-full border-4 ${milestone.status === 'current' ? 'border-yellow-500 bg-yellow-100' : milestone.status === 'past' ? 'border-purple-600 bg-purple-100' : 'border-gray-300 bg-gray-100'}`}>
                    <div className={`h-4 w-4 rounded-full ${milestone.status === 'current' ? 'bg-yellow-500' : milestone.status === 'past' ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                  </div>
                  {index < milestones.length - 1 && <div className="h-full w-1 bg-gray-300 absolute top-0 left-3"></div>}
                </div>
                <div className="ml-4">
                  <div className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h4 className="font-semibold text-lg">{milestone.title}</h4>
                    <p className="text-gray-600 mb-2">{milestone.description}</p>
                    <p className="text-gray-400 italic">{milestone.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Report Button */}
        {/* <div className="flex justify-end mt-6">
          <button
            onClick={handleUploadReport}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Upload Current Report
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectDetailsSection;
