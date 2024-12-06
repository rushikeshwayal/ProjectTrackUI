import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetReport = () => {
  const { projectId } = useParams();  // Using useParams to fetch projectId
  const [entries, setEntries] = useState([]);  // Store an array of entries
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [project_ID, setProject_ID] = useState(projectId);

  useEffect(() => {
    if (!projectId) {
      setError('Invalid project ID.');
      setLoading(false);
      return;
    }

    setProject_ID(projectId);

    const fetchEntries = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/reports/${project_ID}`);
        console.log("API response:", response.data); // Log response to verify structure
        if (response.data && response.data.length > 0) {
          setEntries(response.data);  // Store all reports in the state
        } else {
          setError('No data found for the given ID.');
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError('No data found for the given ID.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [projectId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-50 shadow-lg rounded-lg border border-gray-200">
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

      {entries.length > 0 ? (
        entries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-lg shadow-md p-6 space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Project ID</h2>
              <p className="text-indigo-700 font-medium text-xl">{entry.project_id}</p>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Phase</h2>
              <p className="text-gray-600 font-medium">{entry.phase}</p>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Document</h2>
              <a 
                href={entry.report_doc} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-700 transition duration-200"
              >
                Click Here
              </a>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Created At</h2>
              <p className="text-gray-600 font-medium">{formatDate(entry.created_at)}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-600 text-center font-semibold">
          No reports available.
        </p>
      )}
    </div>
  );
};

export default GetReport;
