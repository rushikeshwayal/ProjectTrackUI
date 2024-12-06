import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FundReport = () => {
  const { projectId } = useParams(); // Extract project_id from the URL params
  const [filteredReport, setFilteredReport] = useState(null); // Store the report for the specific project
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the fund report for the specific projectId
  useEffect(() => {
    const fetchFundReport = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/project_fund/${projectId}`);
        console.log('API Response:', response);

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Data:', data);
          setFilteredReport(data.length > 0 ? data[0] : null); // Assuming the API returns an array
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch fund report');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };
    fetchFundReport();
  }, [projectId]); // Re-run the effect if projectId changes
  console.log('Rendered Filtered Report:', filteredReport);
  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-50 shadow-lg rounded-lg border border-gray-200 ">
      {/* <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
        Fund Report for Project ID: {projectId}
      </h1> */}

      {loading && (
        <p className="text-blue-500 text-lg text-center font-medium animate-pulse">
          Loading report...
        </p>
      )}

      {error && (
        <p className="text-red-600 text-center font-semibold">
          {error}
        </p>
      )}

      {filteredReport ? (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-3 ">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Fund Amount</h2>
            <p className="text-indigo-700 font-medium text-xl">
              ₹{filteredReport.fund_amount.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Fund Releasing Authority</h2>
            <p className="text-gray-600 font-medium">
              {filteredReport.fund_releasing_authority}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Project Phase</h2>
            <p className="text-gray-600 font-medium">{filteredReport.project_phase}</p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Fund Release Date</h2>
            <p className="text-gray-600 font-medium">
              {filteredReport.fund_release_date}
            </p>
          </div>
        </div>
      ) : (
        !loading && (
          <p className="text-red-600 text-center font-semibold">
            No fund report found for this project ID.
          </p>
        )
      )}
    </div>
  );
};

export default FundReport;
