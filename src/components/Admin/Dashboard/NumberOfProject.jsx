import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Replace with your actual context import
import axios from "axios";
import SubDash from "./SubDash";
import { FiClipboard, FiUser, FiUsers, FiCheckCircle } from "react-icons/fi";
import MinistryLogos from "../../Common/MinistryLogos";
import SideNavBarInvestigator from "../Home/SideNavBarAdmin";
import NavBar from "../Home/NavBar";

const NumberOfProject = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/project");
        const filteredProjects = response.data.filter(
          (project) => project.investigator_id === user.ID
        );
        setProjects(filteredProjects);
      } catch (err) {
        setError("Failed to fetch project data");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [user.ID]);

  const calculateStatusCounts = () => {
    const statusCounts = {
      Projects: projects.length,
      Total_Inestigator: 1,
      Project_Cordinator: 1,
      Complited_Project: 0,
    };

    projects.forEach((project) => {
      if (project.isInvestigator) statusCounts.Total_Inestigator++;
      if (project.isCoordinator) statusCounts.Project_Cordinator++;
      if (project.status === "completed") statusCounts.Complited_Project++;
    });

    return statusCounts;
  };

  const {
    Projects,
    Total_Inestigator,
    Project_Cordinator,
    Complited_Project,
  } = calculateStatusCounts();

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Ministry Logos - top section */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <MinistryLogos />
      </div>

      {/* Sidebar - left side */}
      <div
        className={`mt-[100px] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideNavBarInvestigator isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Profile NavBar - top-right corner */}
      <NavBar />

      {/* Main content area */}
      <div
        className={`transition-all duration-300 flex-grow mt-[120px] p-6 ${
          isSidebarOpen ? "ml-80" : "ml-16"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <section className="bg-white rounded-lg p-6 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <Card
              count={Projects}
              label="Projects"
              icon={<FiClipboard />}
              color="bg-blue-500"
            />
            <Card
              count={Total_Inestigator}
              label="Total Investigators"
              icon={<FiUser />}
              color="bg-amber-500"
            />
            <Card
              count={Project_Cordinator}
              label="Project Coordinators"
              icon={<FiUsers />}
              color="bg-green-500"
            />
            <Card
              count={Complited_Project}
              label="Completed Projects"
              icon={<FiCheckCircle />}
              color="bg-gray-700"
            />
          </div>
        </section>
        <div className="flex justify-center mt-6">
          <SubDash />
        </div>
      </div>
    </div>
  );
};

const Card = ({ count, label, icon, color }) => (
  <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
    <div
      className={`flex items-center justify-center w-16 h-16 rounded-full text-white ${color}`}
    >
      {icon}
    </div>
    <div className="mt-4 text-4xl font-bold text-gray-800">{count}</div>
    <div className="mt-2 text-lg font-medium text-gray-600">{label}</div>
  </div>
);

export default NumberOfProject;
