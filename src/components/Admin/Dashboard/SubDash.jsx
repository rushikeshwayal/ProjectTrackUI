import React from "react";
import "./subdash.css"; // Include styles for the scroll bar and any custom styling

const SubDash = () => {
  return (
    <div className="grid grid-cols-2 gap-x-20">
      {/* Stats Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Stats</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Greeting Card */}
          <div className="col-span-2">
            <div className="p-4 bg-green-100 rounded-xl">
              <div className="font-bold text-xl text-gray-800 leading-none">
                Good day, <br />
                Ram Sharma
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                >
                  Start tracking
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
            <div className="font-bold text-2xl leading-none">3</div>
            <div className="mt-2">Project Report Submitted </div>
          </div>
          <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
            <div className="font-bold text-2xl leading-none">0</div>
            <div className="mt-2">Fund Utilization Report Submmition </div>
          </div>

          {/* Daily Plan */}
          <div className="col-span-2">
            <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
              <div className="font-bold text-xl leading-none">Your daily plan</div>
              <div className="mt-2">1 of 0 completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your tasks today</h2>

        <div className="space-y-4">
          {/* Task 1 */}
          <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
            <div className="flex justify-between">
              <div className="text-gray-400 text-xs">Number 10</div>
              <div className="text-gray-400 text-xs">4h</div>
            </div>
            <a
              href="javascript:void(0)"
              className="font-bold hover:text-yellow-800 hover:underline"
            >
              Fund Utilization Report Submission Phase 1
            </a>
            <div className="text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="text-gray-800 inline align-middle mr-1"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
              Deadline is today
            </div>
          </div>

          {/* Task 2 */}
          <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
            <div className="flex justify-between">
              <div className="text-gray-400 text-xs">Admin</div>
              <div className="text-gray-400 text-xs">7d</div>
            </div>
            <a
              href="javascript:void(0)"
              className="font-bold hover:text-yellow-800 hover:underline"
            >
              Need Updaate In Project Report
            </a>
            <div className="text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="text-gray-800 inline align-middle mr-1"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
              New feedback
            </div>
          </div>

          {/* Task 3 */}
          <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
            <div className="flex justify-between">
              <div className="text-gray-400 text-xs">Admin</div>
              <div className="text-gray-400 text-xs">2h</div>
            </div>
            <a
              href="javascript:void(0)"
              className="font-bold hover:text-yellow-800 hover:underline"
            >
              New Project Approved
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubDash;
