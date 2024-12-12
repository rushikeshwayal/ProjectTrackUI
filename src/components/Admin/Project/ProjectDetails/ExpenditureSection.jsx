import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenditureTable = () => {
  const [expenditures, setExpenditures] = useState([]); // State to store fetched expenditures
  const [loading, setLoading] = useState(true); // State to show loading spinner

  // Fetch expenditures data
  useEffect(() => {
    const fetchExpenditures = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/expenditure");
        setExpenditures(response.data); // Store fetched data
        setLoading(false); // Disable loading spinner
      } catch (error) {
        console.error("Error fetching expenditures:", error);
        setLoading(false); // Disable loading spinner even if there is an error
      }
    };

    fetchExpenditures();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-purple-800 mb-6">Expenditure List</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Project ID</th>
              <th className="border border-gray-300 px-4 py-2">Land Building</th>
              <th className="border border-gray-300 px-4 py-2">Equipment</th>
              <th className="border border-gray-300 px-4 py-2">Total Capital</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Consumables</th>
              <th className="border border-gray-300 px-4 py-2">Travel</th>
              <th className="border border-gray-300 px-4 py-2">Workshop/Seminar</th>
              <th className="border border-gray-300 px-4 py-2">Total Revenue</th>
              <th className="border border-gray-300 px-4 py-2">Contingency</th>
              <th className="border border-gray-300 px-4 py-2">Institutional Overhead</th>
              <th className="border border-gray-300 px-4 py-2">Applicable Taxes</th>
              <th className="border border-gray-300 px-4 py-2">Grand Total</th>
              <th className="border border-gray-300 px-4 py-2">Implementing Agency</th>
              <th className="border border-gray-300 px-4 py-2">Sub Agency 1</th>
              <th className="border border-gray-300 px-4 py-2">Sub Agency 2</th>
              <th className="border border-gray-300 px-4 py-2">Sub Agency 3</th>
            </tr>
          </thead>
          <tbody>
            {expenditures.map((expenditure) => (
              <tr key={expenditure.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{expenditure.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{expenditure.project_id}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.land_building}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.equipment}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.totalCapital}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.salary}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.consumables}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.travel}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.workshopSeminar}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.totalRevenue}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.contingency}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.institutionalOverhead}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.applicableTaxes}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{expenditure.grandTotal}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expenditure.implementingAgency ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expenditure.subImplementingAgency1 ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expenditure.subImplementingAgency2 ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expenditure.subImplementingAgency3 ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenditureTable;
