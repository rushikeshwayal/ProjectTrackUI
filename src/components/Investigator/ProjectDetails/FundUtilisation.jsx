import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddFundUtilization = () => {
  const { projectId } = useParams(); // Extract project_id from the URL params
  const [formData, setFormData] = useState({
    project_id: projectId,
    submission_date: "",
    utilized_amount: "",
    quarter: "",
    agency_name: "",
    budget_head: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/post/fund_utilization",
        formData
      );
      setResponseMessage(response.data.message);
      setFormData({
        project_id: "",
        submission_date: "",
        utilized_amount: "",
        quarter: "",
        agency_name: "",
        budget_head: "",
      });
    } catch (error) {
      setResponseMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Add Fund Utilization
        </h2>
        {responseMessage && (
          <div
            className={`mb-6 p-4 rounded-md text-center ${
              responseMessage.includes("success")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {responseMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="submission_date"
              className="block text-sm font-medium text-gray-700"
            >
              Submission Date
            </label>
            <input
              type="date"
              name="submission_date"
              id="submission_date"
              value={formData.submission_date}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="utilized_amount"
              className="block text-sm font-medium text-gray-700"
            >
              Utilized Amount
            </label>
            <input
              type="number"
              step="0.01"
              name="utilized_amount"
              id="utilized_amount"
              value={formData.utilized_amount}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="quarter"
              className="block text-sm font-medium text-gray-700"
            >
              Quarter
            </label>
            <input
              type="text"
              name="quarter"
              id="quarter"
              placeholder="e.g., Q1, Q2"
              value={formData.quarter}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="agency_name"
              className="block text-sm font-medium text-gray-700"
            >
              Agency Name
            </label>
            <input
              type="text"
              name="agency_name"
              id="agency_name"
              value={formData.agency_name}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="budget_head"
              className="block text-sm font-medium text-gray-700"
            >
              Budget Head
            </label>
            <input
              type="text"
              name="budget_head"
              id="budget_head"
              value={formData.budget_head}
              onChange={handleChange}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFundUtilization;
