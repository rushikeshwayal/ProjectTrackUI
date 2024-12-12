import { NavLink } from 'react-router-dom';

export default function SideNavBarAdmin({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } h-full w-80 bg-gray-100 shadow-lg z-40 overflow-y-auto`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Navigation Links */}
          <ul className="flex flex-col space-y-2 mt-20">
            <li className="group">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-500 hover:text-white hover:scale-105 group-hover:shadow-lg'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-500 hover:text-white hover:scale-105 group-hover:shadow-lg'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/admin/chat"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-500 hover:text-white hover:scale-105 group-hover:shadow-lg'
                  }`
                }
              >
                Connect With Investigators
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/create/project"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-500 hover:text-white hover:scale-105 group-hover:shadow-lg'
                  }`
                }
              >
                Create New Project
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/resource/allocation"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-500 hover:text-white hover:scale-105 group-hover:shadow-lg'
                  }`
                }
              >
                Dynamic Resource Allocation
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/analysis/ai"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-500 hover:text-white hover:scale-105 group-hover:shadow-lg'
                  }`
                }
              >
                AI Based Project Analysis
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/ministry/policy"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-500 hover:text-white hover:scale-105 group-hover:shadow-lg'
                  }`
                }
              >
                About Ministry Policy
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed font-extrabold h-10 top-8 left-4 z-50 bg-white px-[12px] rounded-lg text-center border-[2px] border-purple-500 text-purple-500 focus:outline-none"
      >
        {isSidebarOpen ? '◁' : '▷'}
      </button>
    </div>
  );
}
