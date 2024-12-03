import { useNavigate } from 'react-router-dom';

export default function ProjectDetailsModal({ project, closeModal }) {
  const navigate = useNavigate(); // Hook to navigate to report pages

  const handleViewReport = (reportId) => {
    // You can choose to either:
    // - Navigate to a separate report page
    navigate(`/reports/${reportId}`);

    // OR
    // - Open the report in a new tab (for this example)
    // window.open(reportId, "_blank");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg w-3/4 lg:w-1/2 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={closeModal}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>

        <div className="space-y-3">
          <div><strong>Investigator:</strong> {project.investigator}</div>
          <div><strong>Email:</strong> {project.email}</div>
          <div><strong>Co-Investigator:</strong> {project.coInvestigator}</div>
          <div><strong>Organization:</strong> {project.organizationDetails}</div>
          <div><strong>Status:</strong> {project.status}</div>

          {/* Project Timeline Section */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Project Timeline</h3>
            <ul className="space-y-4">
              {project.timeline.map((milestone, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <div>
                    <strong>{milestone.date}:</strong> {milestone.milestone}
                  </div>
                  <button
                    onClick={() => handleViewReport(milestone.report)}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View Report
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
