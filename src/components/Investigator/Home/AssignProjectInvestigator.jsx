import { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";

function AssignedProjectInvestigator() {
  const [activeTab, setActiveTab] = useState('about');
  const [projects, setProjects] = useState([]);
  const [rndProjects, setRndProjects] = useState([]);
  const [stProjects, setStProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth(); // Correctly use useAuth to get user

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user || !user.ID) {
        setError("User ID is not available.");
        return;
      }
      
      console.log(user); // Debugging: log user to ensure it's correct
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/api/project');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Debugging API response

        // Filter projects based on investigator_id matching user.ID
        const filteredProjects = data.filter(project => project.investigator_id === user.ID);
        console.log('Filtered Projects:', filteredProjects);

        // Set the filtered projects
        setProjects(filteredProjects);

        // Categorize projects based on project_type
        const rnd = filteredProjects.filter((project) => project.project_type === 'R&D');
        const st = filteredProjects.filter((project) => project.project_type === 'S&T');

        setRndProjects(rnd);
        setStProjects(st);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]); // Added user as dependency to re-run on user change

  return (
    <div className="w-full bg-gray-100 border border-gray-300 mt-20 rounded-lg shadow-lg">
      <ul
        className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-300 rounded-t-lg bg-gray-50"
        role="tablist"
      >
        <li className="mr-2">
          <button
            onClick={() => setActiveTab('about')}
            className={`inline-block p-4 rounded-tl-lg ${
              activeTab === 'about'
                ? 'text-purple-600 bg-white border-b-2 border-purple-600'
                : 'hover:text-gray-600 hover:bg-gray-200'
            }`}
          >
            R&D
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`inline-block p-4 ${
              activeTab === 'services'
                ? 'text-purple-600 bg-white border-b-2 border-purple-600'
                : 'hover:text-gray-600 hover:bg-gray-200'
            }`}
          >
            S&T
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setActiveTab('statistics')}
            className={`inline-block p-4 rounded-tr-lg ${
              activeTab === 'statistics'
                ? 'text-purple-600 bg-white border-b-2 border-purple-600'
                : 'hover:text-gray-600 hover:bg-gray-200'
            }`}
          >
            FAQ's
          </button>
        </li>
      </ul>
      <div className="overflow-hidden relative bg-gray-50">
        <div className="flex transition-transform duration-500">
          {/* R&D Section */}
          {activeTab === 'about' && (
            <div className="w-full bg-white rounded-lg border-2 border-purple-500 m-10 md:p-8 text-gray-700">
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">R&D Projects</h2>
              {loading && <p>Loading projects...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {rndProjects.length > 0 ? (
                <ul>
                  {rndProjects.map((project) => (
                    <li key={project.id} className="mb-4">
                      <h3 className="text-xl font-bold">{project.project_title}</h3>
                      <p className="text-gray-600">{project.project_description}</p>
                      <p className="text-sm text-gray-500">
                        Approved on: {new Date(project.approval_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">Agency ID: {project.agency_id}</p>
                      <a
                        href={`/investigator/project/details/${project.project_id}`}
                        className="inline-flex items-center font-medium text-purple-600 hover:text-purple-800"
                      >
                        View Details
                        <svg
                          className="w-2.5 h-2.5 ml-2 rtl:rotate-180"
                          aria-hidden="true"
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
            <div className="w-full bg-white rounded-lg border-2 border-purple-500 m-10 md:p-8 text-gray-700">
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">S&T Projects</h2>
              {loading && <p>Loading projects...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {stProjects.length > 0 ? (
                <ul>
                  {stProjects.map((project) => (
                    <li key={project.id} className="mb-4">
                      <h3 className="text-xl font-bold">{project.project_title}</h3>
                      <p className="text-gray-600">{project.project_description}</p>
                      <p className="text-sm text-gray-500">
                        Approved on: {new Date(project.approval_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">Agency ID: {project.agency_id}</p>
                      <a
                        href={`/investigator/project/details/${project.project_id}`}
                        className="inline-flex items-center font-medium text-purple-600 hover:text-purple-800"
                      >
                        View Details
                        <svg
                          className="w-2.5 h-2.5 ml-2 rtl:rotate-180"
                          aria-hidden="true"
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
            <div className="w-full p-6 bg-white rounded-lg md:p-8 text-gray-700">
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">Frequently Asked Questions</h2>
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
    </div>
  );
}

export default AssignedProjectInvestigator;
