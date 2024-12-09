import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FundUtilizationReport = () => {
  const { projectId } = useParams(); // Extract project_id from URL params
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFundUtilizations = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/fund_utilization");
        const allFunds = response.data;

        // Ensure projectId is parsed as a number
        const projectIdInt = parseInt(projectId, 10);

        // Filter data based on the parsed projectId
        const filteredData = allFunds.filter(fund => fund.project_id === projectIdInt);

        setFunds(allFunds);
        setFilteredFunds(filteredData);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error || "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFundUtilizations();
  }, [projectId]);

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Fund Utilization Report
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : errorMessage ? (
          <div className="p-4 mb-6 bg-red-100 text-red-700 border border-red-300 rounded-md text-center">
            {errorMessage}
          </div>
        ) : filteredFunds.length === 0 ? (
          <p className="text-center text-gray-500">No data available for this project.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Utilization ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Submission Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Utilized Amount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quarter</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Agency Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Budget Head</th>
              </tr>
            </thead>
            <tbody>
              {filteredFunds.map((fund) => (
                <tr key={fund.utilization_id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{fund.utilization_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{fund.submission_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{fund.utilized_amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{fund.quarter}</td>
                  <td className="border border-gray-300 px-4 py-2">{fund.agency_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{fund.budget_head}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FundUtilizationReport;
