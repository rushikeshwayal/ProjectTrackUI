import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, CategoryScale, LineElement, PointElement } from 'chart.js';

// Registering Chart.js components
ChartJS.register(LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, CategoryScale, LineElement, PointElement);

const StatisticsSection = ({ statistics }) => {
  // Assuming statistics is structured as follows:
  // statistics = {
  //   funding: { labels: ['Phase 1', 'Phase 2'], data: [500000, 300000] },
  //   status: { ongoing: 60, completed: 30, pending: 10 },
  //   resources: { labels: ['Phase 1', 'Phase 2'], data: [5, 10] },
  // };

  const fundingData = {
    labels: statistics.funding.labels,
    datasets: [
      {
        label: 'Funding Amount (in INR)',
        data: statistics.funding.data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: ['Ongoing', 'Completed', 'Pending'],
    datasets: [
      {
        data: [statistics.status.ongoing, statistics.status.completed, statistics.status.pending],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const resourceData = {
    labels: statistics.resources.labels,
    datasets: [
      {
        label: 'Resources Allocated (in number)',
        data: statistics.resources.data,
        fill: false,
        backgroundColor: 'rgba(255, 206, 86, 1)',
        borderColor: 'rgba(255, 206, 86, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-2xl font-bold mb-4">Project Statistics</h3>

      {/* Funding Bar Chart */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-2">Funding Amount per Project</h4>
        <Bar
          data={fundingData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Amount (INR)',
                },
              },
              x: {
                type: 'category', // Ensure the x-axis is a category scale
              },
            },
            plugins: {
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>

      {/* Project Status Pie Chart */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-2">Project Status Distribution</h4>
        <Pie
          data={statusData}
          options={{
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }}
        />
      </div>

      {/* Resources Allocation Line Chart */}
      <div>
        <h4 className="text-xl font-semibold mb-2">Resources Allocation Over Phases</h4>
        <Line
          data={resourceData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Resources',
                },
              },
              x: {
                type: 'category', // Ensure the x-axis is a category scale
              },
            },
            plugins: {
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StatisticsSection;
