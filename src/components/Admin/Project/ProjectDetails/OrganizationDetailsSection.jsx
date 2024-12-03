import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrganizationDetailsSection = () => {
  const { projectId } = useParams();
  const [organization, setOrganization] = useState(null);
  const [project, setProject] = useState(null);
  const [subAgency, setSubAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch project details first
        const projectResponse = await axios.get(`http://127.0.0.1:5000/api/project/${projectId}`);
        const projectData = projectResponse.data;
        setProject(projectData);

        // Fetch organization details using project.agency_id
        const agencyResponse = await axios.get(`http://127.0.0.1:5000/api/agency/${projectData.agency_id}`);
        const agencyData = agencyResponse.data;
        console.log('Agency Data:', agencyData);

        const selectedOrganization = Array.isArray(agencyData) ? agencyData[0] : agencyData;
        setOrganization(selectedOrganization);

        // Fetch sub-agency details using project.sub_agency_id
        const subAgencyResponse = await axios.get(`http://127.0.0.1:5000/api/sub_agency/${projectData.sub_agency_id}`);
        const subAgencyData = subAgencyResponse.data;
        console.log('Sub-Agency Data:', subAgencyData);

        const selectedSubAgency = Array.isArray(subAgencyData) ? subAgencyData[0] : subAgencyData;
        setSubAgency(selectedSubAgency);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [projectId]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading organization and sub-agency details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-2xl font-bold mb-4">Organization Details</h3>
      {organization ? (
        <div className="mb-6 border-b pb-4">
          <p><strong>Name:</strong> {organization.agency_name || 'N/A'}</p>
          <p><strong>Established:</strong> {organization.established_date ? new Date(organization.established_date).toDateString() : 'N/A'}</p>
          <p><strong>CEO:</strong> {organization.ceo || 'N/A'}</p>
          <p><strong>Address:</strong> {organization.address || 'N/A'}</p>
          <p><strong>Phone:</strong> {organization.phone_no || 'N/A'}</p>
          <p><strong>Email:</strong> {organization.email ? (
            <a href={`mailto:${organization.email}`} className="text-purple-600">{organization.email}</a>
          ) : 'N/A'}</p>
          <p><strong>Professionals:</strong> {organization.agency_professionals || 'N/A'}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No organization details found.</p>
      )}

      <h3 className="text-2xl font-bold mb-4">Sub-Agency Details</h3>
      {subAgency ? (
        <div className="mb-6 border-b pb-4">
          <p><strong>Name:</strong> {subAgency.sub_agency_name || 'N/A'}</p>
          <p><strong>Established:</strong> {subAgency.established_date ? new Date(subAgency.established_date).toDateString() : 'N/A'}</p>
          <p><strong>Head:</strong> {subAgency.head_of_agency || 'N/A'}</p>
          <p><strong>Address:</strong> {subAgency.address || 'N/A'}</p>
          <p><strong>Phone:</strong> {subAgency.phone_no || 'N/A'}</p>
          <p><strong>Email:</strong> {subAgency.email ? (
            <a href={`mailto:${subAgency.email}`} className="text-purple-600">{subAgency.email}</a>
          ) : 'N/A'}</p>
          <p><strong>Professionals:</strong> {subAgency.sub_agency_professionals || 'N/A'}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No sub-agency details found.</p>
      )}
    </div>
  );
};

export default OrganizationDetailsSection;
