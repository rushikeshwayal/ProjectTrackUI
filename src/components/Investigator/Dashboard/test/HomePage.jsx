import React, { useState, useEffect } from "react";
import NavBar from "../../Home/NavBar";
import MinistryLogos from "../../../Common/MinistryLogos";
import SideNavBar from "../../Home/SideNavBarInvestigator";
import { FiClipboard, FiUsers, FiDollarSign, FiCheckCircle } from "react-icons/fi";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useState({
    totalVisitors: 25000,
    activeUsers: 1500,
    revenue: 120000,
    tasks: 76,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulating an API call for fetching dynamic data
    setLoading(true);
    setTimeout(() => {
      setData({
        totalVisitors: 26000,
        activeUsers: 1550,
        revenue: 125000,
        tasks: 80,
      });
      setLoading(false);
    }, 2000); // Simulate 2 seconds loading time
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

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
        <SideNavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Profile NavBar - top-right corner */}
      <NavBar setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main content area */}
      <div
        className={`transition-all duration-300 flex-grow mt-[120px] p-6 ${
          isSidebarOpen ? "ml-80" : "ml-16"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {/* Dashboard Stats */}
        <section className="bg-white rounded-lg p-6 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <Card
              count={data.totalVisitors}
              label="Total Visitors"
              icon={<FiClipboard />}
              color="bg-blue-500"
            />
            <Card
              count={data.activeUsers}
              label="Active Users"
              icon={<FiUsers />}
              color="bg-green-500"
            />
            <Card
              count={`$${data.revenue.toLocaleString()}`}
              label="Revenue"
              icon={<FiDollarSign />}
              color="bg-purple-500"
            />
            <Card
              count={data.tasks}
              label="Tasks"
              icon={<FiCheckCircle />}
              color="bg-red-500"
            />
          </div>
        </section>

        {/* Chart Section */}
        <div className="bg-white rounded-lg p-6 shadow-lg mt-8">
          <h2 className="text-lg font-bold mb-4">Visitor Analytics</h2>
          <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500 shadow-inner rounded-lg">
            <p>Chart Placeholder (Insert a chart library like Chart.js here)</p>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg p-6 shadow-lg mt-8">
          <h2 className="text-lg font-bold mb-4">Recent Notifications</h2>
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span>New payment received from XYZ Corp.</span>
              <span className="text-gray-500">10 mins ago</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>User Alex completed onboarding process.</span>
              <span className="text-gray-500">25 mins ago</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Team meeting scheduled at 2:00 PM.</span>
              <span className="text-gray-500">1 hour ago</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>System updates applied successfully.</span>
              <span className="text-gray-500">3 hours ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
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

export default HomePage;
