import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfilePng from '../../../../assets/Profile.png';

const SubInvestigatorDetailsSection = () => {
  const { projectId } = useParams(); // Assume projectId is a route parameter
  const [subInvestigator, setSubInvestigator] = useState(null); // Store sub-investigator data
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project and sub-investigator details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch project details
        const projectResponse = await axios.get(`http://127.0.0.1:5000/api/project/${projectId}`);
        const projectData = projectResponse.data;
        setProject(projectData);

        // Fetch sub-investigator details using project.investigator_id
        if (projectData.investigator_id) {
          const subInvestigatorResponse = await axios.get(
            `http://127.0.0.1:5000/api/sub_investigator/${projectData.sub_investigator_id}`
          );
          setSubInvestigator(subInvestigatorResponse.data);
        } else {
          setError('Sub-Investigator ID not found in project data.');
        }
      } catch (err) {
        setError('Failed to fetch details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [projectId]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!subInvestigator || !project) {
    return <div className="text-center text-gray-500">No details available.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative p-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center justify-center space-x-6 mb-8">
          <img
            src={ProfilePng}
            alt="Sub-Investigator"
            className="w-32 h-32 rounded-full border-4 border-purple-700 shadow-lg"
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-700">{subInvestigator.sub_investigator_name}</h1>
            <h2 className="text-xl text-gray-600">{subInvestigator.designation}</h2>
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          {/* Personal Information */}
          <h3 className="text-3xl font-bold mb-4 text-purple-700">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-700 font-semibold">Email</p>
              <p className="text-gray-900">{subInvestigator.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Phone</p>
              <p className="text-gray-900">{subInvestigator.phone_no}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Date of Birth</p>
              <p className="text-gray-900">{new Date(subInvestigator.dob).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Address</p>
              <p className="text-gray-900">{subInvestigator.address}</p>
            </div>
          </div>

          {/* Professional Information */}
          <h3 className="text-3xl font-bold mb-4 text-purple-700">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-700 font-semibold">Designation</p>
              <p className="text-gray-900">{subInvestigator.designation}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Experience</p>
              <p className="text-gray-900">{subInvestigator.experience}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Department</p>
              <p className="text-gray-900">{subInvestigator.department}</p>
            </div>
          </div>

          {/* Additional Information */}
          <h3 className="text-3xl font-bold mb-4 text-purple-700">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-semibold">Identification</p>
              <p className="text-gray-900">{subInvestigator.identification}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Highest Qualification</p>
              <p className="text-gray-900">{subInvestigator.highest_qualification}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubInvestigatorDetailsSection;
