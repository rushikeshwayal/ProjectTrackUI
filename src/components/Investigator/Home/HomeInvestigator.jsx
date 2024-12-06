import MinistryLogos from "../../Common/MinistryLogos";
import SideNavBarInvestigator from "./SideNavBarInvestigator";
import NavBar from "./NavBar";
import { useState } from 'react';
import AssignedProjectInvestigator from "./AssignProjectInvestigator";

function Home2() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open/close state
  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Ministry Logos - top section */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <MinistryLogos />
      </div>

      {/* Sidebar - left side */}
      <div className={`mt-[100px] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SideNavBarInvestigator isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Profile NavBar - top-right corner */}
      <NavBar />

      {/* Main content area */}
      <div
        className={`transition-all duration-300 flex-grow mt-40 p-4 ${isSidebarOpen ? 'ml-80' : 'ml-16'} mt-[120px]`} // Adjust margin based on sidebar state and top margin for MinistryLogos
      >
        <h1 className="text-2xl font-bold">Welcome to Pragati.Track</h1>
        {/* Add your main content here */}
        <AssignedProjectInvestigator/>
      </div>
    </div>
  );
}

export default Home2;