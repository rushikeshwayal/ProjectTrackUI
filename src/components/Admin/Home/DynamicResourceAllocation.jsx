import { useState } from 'react';
import MinistryLogos from '../../Common/MinistryLogos'; // Importing the MinistryLogos component
import SideNavBarAdmin from './SideNavBarAdmin'; // Importing the Sidebar component
import Dynamic1Png from '../../../assets/Dynamic1.jpg';
import Dynamic3Png from '../../../assets/Dynamic 3.jpg'; // Importing the Dynamic3.png image
import NavBar from './NavBar';
const DynamicResourceAllocation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [allocationData, setAllocationData] = useState({ uniqueId: '', totalFunds: '', amountToAllocate: '' }); // State for allocation data
  const [allocationRecords, setAllocationRecords] = useState([]); // State for storing allocation records

  // Sample data for delayed or canceled projects
  const delayedProjects = [
    { id: 1, name: 'Project A', reason: 'Budget constraints', uniqueId: 'A123', totalFunds: 100000 },
    { id: 2, name: 'Project B', reason: 'Resource unavailability', uniqueId: 'B456', totalFunds: 150000 },
    { id: 3, name: 'Project C', reason: 'Technical issues', uniqueId: 'C789', totalFunds: 120000 },
  ];

  const handleDistributeResources = () => {
    const project = delayedProjects.find(proj => proj.uniqueId === allocationData.uniqueId);
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllocationData({ ...allocationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to distribute resources based on the form data
    setAllocationRecords([...allocationRecords, {
      uniqueId: allocationData.uniqueId,
      projectName: selectedProject.name,
      allocatedAmount: allocationData.amountToAllocate,
    }]);
    alert(`Allocating ${allocationData.amountToAllocate} to ${selectedProject.name} (${allocationData.uniqueId})`);
    setShowModal(false); // Close modal after submission
    setAllocationData({ uniqueId: '', totalFunds: '', amountToAllocate: '' }); // Clear form data
  };

  return (
    <div className="flex relative min-h-screen bg-gray-100">
      {/* Ministry Logos */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <MinistryLogos />
      </div>
      <div>
      <NavBar/>
      </div>
      {/* Sidebar */}
      <div className={`top-[500px] left-0 transition-transform duration-300 z-50 mt-[120px] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SideNavBarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ml-${isSidebarOpen ? '80' : '20'} mt-[120px] p-8 flex-grow`}>
        <h1 className="text-4xl font-bold text-purple-800 mb-6">Dynamic Resource Allocation</h1>

        {/* Project Information */}
        <section className="mb-10">
          <p className="text-gray-600 mb-4">
  Dynamic Resource Allocation is an advanced AI-driven system designed to optimize the distribution of resources across multiple projects based on real-time data analysis. This innovative approach ensures that resources—whether financial, human, or material—are allocated efficiently and effectively to address the most pressing needs of ongoing projects.
</p>

<hr className="my-4" />

<strong className="text-bold">Real-Time Data Analysis:</strong>
<p className="text-gray-600 mb-4">
  The system continuously analyzes project reports and performance metrics, identifying projects that are facing challenges, such as delays or resource shortages. This enables timely intervention to prevent project stagnation.
</p>

<hr className="my-4" />

<strong className="text-bold">Optimized Resource Distribution:</strong>
<p className="text-gray-600 mb-4">
  By assessing various factors—including resource usage, team performance, and external dependencies—our AI algorithms recommend optimal reallocation of resources. This ensures that projects with the highest urgency receive the necessary support to keep them on track.
</p>

<hr className="my-4" />

<strong className="text-bold">Enhanced Decision-Making:</strong>
<p className="text-gray-600 mb-4">
  Through intelligent data insights, project managers can make informed decisions about where to direct resources. This proactive approach enhances productivity, mitigates risks, and ultimately leads to successful project outcomes.
</p>

<hr className="my-4" />

<strong className="text-bold">Flexibility and Responsiveness:</strong>
<p className="text-gray-600 mb-4">
  The dynamic nature of this system allows for quick adjustments in resource allocation, accommodating unexpected challenges or changes in project scopes. It ensures that the project management team can respond swiftly to evolving project needs.
</p>

<hr className="my-4" />

<strong className="text-bold">Performance Tracking:</strong>
<p className="text-gray-600 mb-4">
  The system not only facilitates resource allocation but also tracks the performance of projects post-allocation. This helps in evaluating the effectiveness of resource distribution strategies and improving future decision-making processes.
</p>

          <img src={Dynamic1Png} alt="Resource Allocation" className="mb-4 h-[400px] rounded-lg shadow-lg" />
        </section>

  {/* Delayed Projects Table */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Delayed or Canceled Projects</h2>
          <table className="min-w-full bg-gray-100">
            <thead>
              <tr className="bg-purple-200 text-gray-700">
                <th className="py-3 px-4 text-left">Project Name</th>
                <th className="py-3 px-4 text-left">Reason</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {delayedProjects.map((project) => (
                <tr key={project.id} className="text-gray-800 hover:bg-gray-200 transition duration-300">
                  <td className="border p-4">{project.name}</td>
                  <td className="border p-4">{project.reason}</td>
                  <td className="border p-4">
                    <button
                      onClick={() => {
                        setAllocationData({
                          ...allocationData,
                          uniqueId: project.uniqueId,
                          totalFunds: project.totalFunds
                        });
                        handleDistributeResources();
                      }}
                      className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition-all duration-200"
                    >
                      Distribute Resources
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

       {/* Modal for Resource Allocation */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Distribute Resources for {selectedProject?.name}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Project Unique ID</label>
                  <select
                    name="uniqueId"
                    value={allocationData.uniqueId}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md w-full p-2"
                  >
                    <option value="">Select Project Unique ID</option>
                    {delayedProjects.map((project) => (
                      <option key={project.id} value={project.uniqueId}>
                        {project.uniqueId}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Total Funds Available</label>
                  <input
                    type="number"
                    name="totalFunds"
                    value='100000'
                    readOnly
                    className="border border-gray-300 rounded-md w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Amount to Allocate</label>
                  <input
                    type="number"
                    name="amountToAllocate"
                    value={allocationData.amountToAllocate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md w-full p-2"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition-all duration-200"
                  >
                    Allocate
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="ml-2 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

   {/* Allocation Records Table */}
        {allocationRecords.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Past Allocation Records</h2>
            <table className="min-w-full bg-gray-100">
              <thead>
                <tr className="bg-green-200 text-gray-700">
                  <th className="py-3 px-4 text-left">Project Name</th>
                  <th className="py-3 px-4 text-left">Unique ID</th>
                  <th className="py-3 px-4 text-left">Allocated Amount</th>
                </tr>
              </thead>
              <tbody>
                {allocationRecords.map((record, index) => (
                  <tr key={index} className="text-gray-800 hover:bg-gray-200 transition duration-300">
                    <td className="border p-4">{record.projectName}</td>
                    <td className="border p-4">{record.uniqueId}</td>
                    <td className="border p-4">{record.allocatedAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}


        {/* How AI Works */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">How Does the AI Analyze Projects?</h2>
          <p className="text-gray-600 mb-4">
            The AI utilizes machine learning algorithms to assess various factors impacting project success...
          </p>
          <img src={Dynamic3Png} alt="AI Analysis" className="mb-4 h-[400px] rounded-lg shadow-lg" />
        </section>

      

 

     
      </div>
    </div>
  );
};

export default DynamicResourceAllocation;
