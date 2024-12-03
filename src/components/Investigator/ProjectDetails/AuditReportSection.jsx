import { useState } from 'react';

const AuditReportSection = ({ projectName }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Modal for viewing report details
  const [selectedReport, setSelectedReport] = useState(null); // Selected report for viewing details

  // Sample past audit reports for a specific project
  const [auditReports, setAuditReports] = useState([
    { id: 1, projectName: 'Innovative Technology Development', investigator: 'Rushikesh Wayal', reportDate: '2023-06-15', verified: false },
    { id: 2, projectName: 'Innovative Technology Development', investigator: 'Rushikesh Wayal', reportDate: '2023-07-20', verified: false },
  ]);

  // Sample investigator-specific reports
  const [investigatorReports, setInvestigatorReports] = useState([
    { id: 1, investigator: 'Rushikesh Wayal', title: 'Initial Research Findings', reportDate: '2023-06-10', verified: true },
    { id: 2, investigator: 'Rushikesh Wayal', title: 'Prototype Development Insights', reportDate: '2023-07-15', verified: false },
  ]);

  // Function to view report details
  const viewReportDetails = (report) => {
    setSelectedReport(report);
    setShowDetailsModal(true);
  };

  // Function to verify a report
  const verifyReport = (id) => {
    setAuditReports(auditReports.map(report => report.id === id ? { ...report, verified: true } : report));
    setShowDetailsModal(false); // Close the details modal
  };

  const verifyInvestigatorReport = (id) => {
    setInvestigatorReports(investigatorReports.map(report => report.id === id ? { ...report, verified: true } : report));
    setShowDetailsModal(false);
  };

  // Function to close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedReport(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col p-4">
      <h1 className="text-4xl font-bold text-purple-700 mb-8">Reports{projectName}</h1>

      {/* Modal for viewing report details */}
      {showDetailsModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={closeDetailsModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Report Details</h2>
            <p className="mb-2"><strong>Project Name:</strong> {selectedReport.projectName || projectName}</p>
            <p className="mb-2"><strong>Investigator:</strong> {selectedReport.investigator}</p>
            <p className="mb-2"><strong>Report Date:</strong> {selectedReport.reportDate}</p>
            <div className="flex justify-between mt-4">
              {!selectedReport.verified && (
                <button
                  onClick={() => selectedReport.title ? verifyInvestigatorReport(selectedReport.id) : verifyReport(selectedReport.id)}
                  className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-all duration-200"
                >
                  Verify Report
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Past Audit Reports Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Past Audit Reports</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-200 text-gray-700">
              <th className="border p-2">Project Name</th>
              <th className="border p-2">Investigator</th>
              <th className="border p-2">Report Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {auditReports.map((report) => (
              <tr key={report.id} className={`text-gray-800 ${report.verified ? 'bg-green-100' : ''}`}>
                <td className="border p-2">{report.projectName}</td>
                <td className="border p-2">{report.investigator}</td>
                <td className="border p-2">{report.reportDate}</td>
                <td className="border p-2">{report.verified ? 'Verified' : 'Pending'}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => viewReportDetails(report)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all duration-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Investigator Reports Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Investigator Reports</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-200 text-gray-700">
              <th className="border p-2">Investigator</th>
              <th className="border p-2">Report Title</th>
              <th className="border p-2">Report Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {investigatorReports.map((report) => (
              <tr key={report.id} className={`text-gray-800 ${report.verified ? 'bg-green-100' : ''}`}>
                <td className="border p-2">{report.investigator}</td>
                <td className="border p-2">{report.title}</td>
                <td className="border p-2">{report.reportDate}</td>
                <td className="border p-2">{report.verified ? 'Verified' : 'Pending'}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => viewReportDetails(report)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all duration-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditReportSection;
