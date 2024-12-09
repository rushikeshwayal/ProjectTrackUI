import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function AssignedProjectInvestigator() {
  const [activeTab, setActiveTab] = useState('about');
  const [projects, setProjects] = useState([]);
  const [rndProjects, setRndProjects] = useState([]);
  const [stProjects, setStProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user || !user.ID) {
        setError('User ID is not available.');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/api/project');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const filteredProjects = data.filter(
          (project) => project.investigator_id === user.ID
        );

        setProjects(filteredProjects);

        const rnd = filteredProjects.filter(
          (project) => project.project_type === 'R&D'
        );
        const st = filteredProjects.filter(
          (project) => project.project_type === 'S&T'
        );

        setRndProjects(rnd);
        setStProjects(st);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  return (
    <div className="w-full bg-gray-50 border border-gray-300 mt-20 rounded-lg shadow-lg">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-600 border-b border-gray-300 bg-gray-100 rounded-t-lg">
        <li className="mr-2">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-3 rounded-tl-lg ${
              activeTab === 'about'
                ? 'text-purple-700 bg-white border-b-2 border-purple-700'
                : 'hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            R&D
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-3 ${
              activeTab === 'services'
                ? 'text-purple-700 bg-white border-b-2 border-purple-700'
                : 'hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            S&T
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setActiveTab('statistics')}
            className={`px-4 py-3 rounded-tr-lg ${
              activeTab === 'statistics'
                ? 'text-purple-700 bg-white border-b-2 border-purple-700'
                : 'hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            FAQ's
          </button>
        </li>
      </ul>

      <div className="p-6 bg-gray-50 rounded-b-lg">
        {/* R&D Section */}
        {activeTab === 'about' && (
          <div className="w-full bg-white rounded-lg border-2 border-purple-500 p-8 text-gray-700">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">R&D Projects</h2>
            {loading && <p>Loading projects...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {rndProjects.length > 0 ? (
              <ul className="space-y-4">
                {rndProjects.map((project) => (
                  <li key={project.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-bold text-gray-800">{project.project_title}</h3>
                    <p className="text-sm text-gray-600">{project.project_description}</p>
                    <p className="text-sm text-gray-500">
                      Approved on: {new Date(project.approval_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Agency ID: {project.agency_id}</p>
                    <a
                      href={`/investigator/project/details/${project.project_id}`}
                      className="inline-flex items-center mt-2 text-sm font-medium text-purple-600 hover:text-purple-800"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p>No R&D projects assigned.</p>
            )}
          </div>
        )}

        {/* S&T Section */}
        {activeTab === 'services' && (
          <div className="w-full bg-white rounded-lg border-2 border-purple-500 p-8 text-gray-700">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">S&T Projects</h2>
            {loading && <p>Loading projects...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {stProjects.length > 0 ? (
              <ul className="space-y-4">
                {stProjects.map((project) => (
                  <li key={project.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-bold text-gray-800">{project.project_title}</h3>
                    <p className="text-sm text-gray-600">{project.project_description}</p>
                    <p className="text-sm text-gray-500">
                      Approved on: {new Date(project.approval_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Agency ID: {project.agency_id}</p>
                    <a
                      href={`/investigator/project/details/${project.project_id}`}
                      className="inline-flex items-center mt-2 text-sm font-medium text-purple-600 hover:text-purple-800"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p>No S&T projects assigned.</p>
            )}
          </div>
        )}

        {/* FAQ Section */}
        {activeTab === 'statistics' && (
          <div className="w-full p-6 bg-white rounded-lg text-gray-700">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Q1: What is an R&D project?</h3>
              <p className="text-gray-600">
                An R&D (Research and Development) project refers to activities that a business or government
                undertakes to innovate and introduce new products or services.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignedProjectInvestigator;
