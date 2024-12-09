import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Adjust the path to your Auth context

const FileUploadForm = () => {
  const { user } = useAuth(); // Assume useAuth provides an ID for the investigator
  const [projects, setProjects] = useState([]);
  const [projectID, setProjectID] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Options for the dropdown
  const formOptions = [
    { label: "FORM-I_NEW" },
    { label: "FORM-II_NEW" },
    { label: "FORM-III_NEW" },
    { label: "FORM-IV_NEW" },
    { label: "FORM-V_NEW" },
    { label: "FORM-VI_NEW" },
    { label: "FORM-VII_NEW" },
    { label: "FORM-VIII_NEW" },
    { label: "FORM-IX_NEW" },
    { label: "FORM-X_NEW" },
    { label: "FORM-XI_NEW" },
    { label: "FORM-XII_NEW" },
    { label: "FORM-XIII_NEW" },
  ];

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/project");
        const filteredProjects = response.data.filter(
          (project) => project.investigator_id === user.ID
        );
        setProjects(filteredProjects);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch projects. Please try again.");
      }
    };

    fetchProjects();
  }, [user.ID]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!projectID || !file || !fileName) {
      setError("Project ID, File Name, and File are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("project_id", projectID);
    formData.append("file_name", fileName); // Pass selected file name
    formData.append("file", file);
  
    try {
      await axios.post(
        "http://127.0.0.1:5000/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("File uploaded successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
      setMessage("");
    }
  };
  

  return (
    <div className="flex justify-center items-center gap">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Upload File
        </h2>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 border border-red-200 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-2 text-sm text-green-600 bg-green-100 border border-green-200 rounded">
            {message}
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="project_id"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Project
          </label>
          <select
            id="project_id"
            value={projectID}
            onChange={(e) => setProjectID(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="" disabled>
              Select a project
            </option>
            {projects.map((project) => (
              <option key={project.project_id} value={project.project_id}>
                {project.project_name} (ID: {project.project_id})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="file_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            File Name
          </label>
          <select
            id="file_name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="" disabled>
              Select a file name
            </option>
            {formOptions.map((option, index) => (
              <option key={index} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;
