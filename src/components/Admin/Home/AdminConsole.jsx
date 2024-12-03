import { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal"; // Import Modal Component

const projects = [
  {
    id: 1,
    title: "R&D Project Alpha",
    investigator: "Dr. John Doe",
    coInvestigator: "Dr. Alice",
    organization: "Tech Corp",
    status: "In Progress",
    timeline: [
      { date: "Jan 2023", milestone: "Project Initiation", report: "/reports/initiation.pdf" },
      { date: "Mar 2023", milestone: "Phase 1 Complete", report: "/reports/phase1.pdf" },
      { date: "Jun 2023", milestone: "Phase 2 Complete", report: "/reports/phase2.pdf" },
    ],
    email: "johndoe@techcorp.com",
    organizationDetails: "Tech Corp, San Francisco, USA",
  },
  {
    id: 2,
    title: "S&T Project Beta",
    investigator: "Dr. Jane Smith",
    coInvestigator: "Dr. Bob",
    organization: "Innovate Inc",
    status: "Completed",
    timeline: [
      { date: "Jan 2022", milestone: "Project Initiation", report: "/reports/initiation.pdf" },
      { date: "May 2022", milestone: "Phase 1 Complete", report: "/reports/phase1.pdf" },
      { date: "Sep 2022", milestone: "Final Report", report: "/reports/final.pdf" }
    ],
    email: "janesmith@innovate.com",
    organizationDetails: "Innovate Inc, New York, USA",
  },
];

const getproject = async () => {

}

export default function AdminConsole() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle modal close
  const closeModal = () => setSelectedProject(null);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">R&D and S&T Projects</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr className="w-full bg-purple-600 text-white">
              <th className="p-3 text-left">Project Title</th>
              <th className="p-3 text-left">Investigator</th>
              <th className="p-3 text-left">Organization</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{project.title}</td>
                <td className="p-3">{project.investigator}</td>
                <td className="p-3">{project.organization}</td>
                <td className="p-3">{project.status}</td>
                <td className="p-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to show detailed information */}
      {selectedProject && (
        <ProjectDetailsModal project={selectedProject} closeModal={closeModal} />
      )}
    </div>
  );
}
