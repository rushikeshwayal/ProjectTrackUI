import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Assuming you have a custom hook for authentication

const AdminExpenditure = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [projects, setProjects] = useState([]); // To store fetched projects
  const [formData, setFormData] = useState({
    project_id: "",
    land_building: "",
    equipment: "",
    totalCapital: "",
    salary: "",
    consumables: "",
    travel: "",
    workshopSeminar: "",
    totalRevenue: "",
    contingency: "",
    institutionalOverhead: "",
    applicableTaxes: "",
    grandTotal: "",
    implementingAgency: false,
    subImplementingAgency1: false,
    subImplementingAgency2: false,
    subImplementingAgency3: false,
  });

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/project");
        setProjects(response.data); // Store all fetched projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormData(updatedFormData);

    // Dynamically calculate totals
    if (
      ["land_building", "equipment", "salary", "consumables", "travel", "workshopSeminar"].includes(
        name
      )
    ) {
      const capitalTotal =
        parseFloat(updatedFormData.land_building || 0) + parseFloat(updatedFormData.equipment || 0);
      const revenueTotal =
        parseFloat(updatedFormData.salary || 0) +
        parseFloat(updatedFormData.consumables || 0) +
        parseFloat(updatedFormData.travel || 0) +
        parseFloat(updatedFormData.workshopSeminar || 0);
      const grandTotal =
        capitalTotal +
        revenueTotal +
        parseFloat(updatedFormData.contingency || 0) +
        parseFloat(updatedFormData.institutionalOverhead || 0) +
        parseFloat(updatedFormData.applicableTaxes || 0);

      setFormData((prevData) => ({
        ...prevData,
        totalCapital: capitalTotal.toFixed(2),
        totalRevenue: revenueTotal.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/post/expenditure", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Expenditure data submitted successfully!");
      console.log(response.data);

      // Reset form data to initial state
      setFormData({
        project_id: "",
        land_building: "",
        equipment: "",
        totalCapital: "",
        salary: "",
        consumables: "",
        travel: "",
        workshopSeminar: "",
        totalRevenue: "",
        contingency: "",
        institutionalOverhead: "",
        applicableTaxes: "",
        grandTotal: "",
        implementingAgency: false,
        subImplementingAgency1: false,
        subImplementingAgency2: false,
        subImplementingAgency3: false,
      });
    } catch (error) {
      console.error("Error submitting expenditure data:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-purple-800 mb-6">Capital and Revenue Expenditure</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Selection */}
        <h2 className="text-2xl font-semibold text-purple-600">Select Project</h2>
        <div>
          <label className="block text-gray-700 font-medium">Project</label>
          <select
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.project_id} value={project.project_id}>
                {project.project_name}
              </option>
            ))}
          </select>
        </div>

        {/* Agency Type Checkboxes */}
        <h2 className="text-2xl font-semibold text-purple-600">Agency Types</h2>
        <div className="space-y-4">
          {[{ name: "implementingAgency", label: "Implementing Agency" },
            { name: "subImplementingAgency1", label: "Sub-Implementing Agency 1" },
            { name: "subImplementingAgency2", label: "Sub-Implementing Agency 2" },
            { name: "subImplementingAgency3", label: "Sub-Implementing Agency 3" }].map((checkbox) => (
            <label key={checkbox.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={checkbox.name}
                checked={formData[checkbox.name]}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-gray-700">{checkbox.label}</span>
            </label>
          ))}
        </div>

        {/* Capital Expenditure */}
        <h2 className="text-2xl font-semibold text-purple-600">Capital Expenditure</h2>
        <div>
          <label className="block text-gray-700 font-medium">Land Building</label>
          <input
            type="number"
            name="land_building"
            value={formData.land_building}
            onChange={handleChange}
            placeholder="Enter Land Building Cost"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Equipment</label>
          <input
            type="number"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            placeholder="Enter Equipment Cost"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mt-4 text-gray-800 font-bold">Total Capital: {formData.totalCapital}</div>

        {/* Revenue Expenditure */}
        <h2 className="text-2xl font-semibold text-purple-600">Revenue Expenditure</h2>
        <div>
          <label className="block text-gray-700 font-medium">Salary/Allowances</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter Salary Cost"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Consumables</label>
          <input
            type="number"
            name="consumables"
            value={formData.consumables}
            onChange={handleChange}
            placeholder="Enter Consumables Cost"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Travel</label>
          <input
            type="number"
            name="travel"
            value={formData.travel}
            onChange={handleChange}
            placeholder="Enter Travel Cost"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Workshop/Seminar</label>
          <input
            type="number"
            name="workshopSeminar"
            value={formData.workshopSeminar}
            onChange={handleChange}
            placeholder="Enter Workshop/Seminar Cost"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mt-4 text-gray-800 font-bold">Total Revenue: {formData.totalRevenue}</div>

        {/* Other Expenditures */}
        <h2 className="text-2xl font-semibold text-purple-600">Other Expenditures</h2>
        <div>
          <label className="block text-gray-700 font-medium">Contingency</label>
          <input
            type="number"
            name="contingency"
            value={formData.contingency}
            onChange={handleChange}
            placeholder="Enter Contingency Cost"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Institutional Overhead</label>
          <input
            type="number"
            name="institutionalOverhead"
            value={formData.institutionalOverhead}
            onChange={handleChange}
            placeholder="Enter Institutional Overhead Cost"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Applicable Taxes</label>
          <input
            type="number"
            name="applicableTaxes"
            value={formData.applicableTaxes}
            onChange={handleChange}
            placeholder="Enter Applicable Taxes"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mt-4 text-gray-800 font-bold">Grand Total: {formData.grandTotal}</div>

        <button
          type="submit"
          className="px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
        >
          Submit Expenditure
        </button>
      </form>
    </div>
  );
};

export default AdminExpenditure;
