import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RDProjects = () => {
  const [rdProjects, setRdProjects] = useState([]);
  const [investigators, setInvestigators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects and investigators from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axios.get('http://127.0.0.1:5000/api/project');
        const investigatorResponse = await axios.get('http://127.0.0.1:5000/api/investigator');

        // Filter projects with project_type as "R&D"
        const filteredProjects = projectResponse.data.filter(project => project.project_type === 'R&D');
        setRdProjects(filteredProjects);

        // Store investigators data
        setInvestigators(investigatorResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Helper function to get the project manager name based on investigator_id
  const getProjectManager = (investigatorId) => {
    const investigator = investigators.find(inv => inv.investigator_id === investigatorId);
    return investigator ? investigator.investigator_name : 'Unknown';
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">R&D Projects Overview</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="py-2 px-4">Project Name</th>
            <th className="py-2 px-4">Project Investigator</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">End Date</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {rdProjects.length > 0 ? (
            rdProjects.map((project) => (
              <tr key={project.project_id}>
                <td className="py-2 px-4 border">{project.project_name}</td>
                <td className="py-2 px-4 border">{getProjectManager(project.project_coordinator_id)}</td>
                <td className="py-2 px-4 border">N/A</td>
                <td className="py-2 px-4 border">{project.project_start_date}</td>
                <td className="py-2 px-4 border">{project.project_end_date}</td>
                <td className="py-2 px-4 border">
                  <Link to={`/admin/project/details/${project.project_id}`}>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 text-center" colSpan="6">
                No R&D Projects Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RDProjects;
// /${project.project_id}