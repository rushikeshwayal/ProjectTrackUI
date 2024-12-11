import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";

const GanttChart = () => {
  const { projectId } = useParams();
  const [apiData, setApiData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch API Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/project_status");
        if (!response.ok) throw new Error("Failed to fetch project status data");
        const data = await response.json();
        setApiData(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  // Prepare data for Gantt Chart
  useEffect(() => {
    if (projectId && apiData.length > 0) {
      const projectSpecificData = apiData.filter(
        (item) => item.project_id === parseInt(projectId, 10)
      );

      const ganttData = [
        [
          { type: "string", label: "Task ID" },
          { type: "string", label: "Task Name" },
          { type: "string", label: "Resource" },
          { type: "date", label: "Start Date" },
          { type: "date", label: "End Date" },
          { type: "number", label: "Duration" },
          { type: "number", label: "Percent Complete" },
          { type: "string", label: "Dependencies" },
        ],
      ];

      projectSpecificData.forEach((item, index) => {
        const startDate = new Date(item.date_of_updation);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7); // Assuming 7 days duration for each task

        ganttData.push([
          `Task${index + 1}`, // Task ID
          item.phase, // Task Name
          "Resource", // Resource (can be dynamic)
          startDate, // Start Date
          endDate, // End Date
          null, // Duration (calculated from start & end dates)
          Math.floor(Math.random() * 100), // Percent Complete (dummy value)
          null, // Dependencies (if any)
        ]);
      });

      setChartData(ganttData);
    }
  }, [projectId, apiData]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      <h3 className="text-3xl font-bold mb-6 text-purple-700 text-center">
        Project Gantt Chart
      </h3>

      {error && <div className="text-center text-red-500 mb-6">{error}</div>}

      {chartData.length > 1 ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Chart
            chartType="Gantt"
            width="100%"
            height="500px"
            data={chartData}
            options={{
              gantt: {
                trackHeight: 30,
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          {apiData.length > 0 ? "No data available for this project." : "Loading..."}
        </p>
      )}
    </div>
  );
};

export default GanttChart;
