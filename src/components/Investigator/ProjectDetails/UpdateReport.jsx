import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateReportForm = () => {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    project_id: projectId,
    phase: '',
  });
  const [reportFile, setReportFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseType, setResponseType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.project_id || !formData.phase || !reportFile) {
      setResponseMessage('All fields are required.');
      setResponseType('error');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('project_id', formData.project_id);
    data.append('phase', formData.phase);
    data.append('report_file', reportFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/post/reports', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseMessage('Report submitted successfully!');
      setResponseType('success');
      setFormData({ project_id: '', phase: '' });
      setReportFile(null);
    } catch (error) {
      setResponseMessage('Failed to submit the report.');
      setResponseType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 m-20  rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      <h2 className="text-purple-600 text-2xl font-bold mb-6 text-center">Submit New Project Report</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Phase */}
        <div>
          <label htmlFor="phase" className="block text-sm font-medium text-purple-600 mb-2">
            Project Phase
          </label>
          <input
            type="text"
            name="phase"
            placeholder="Enter the project phase"
            value={formData.phase}
            onChange={handleInputChange}
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
            required
          />
        </div>

        {/* Report File */}
        <div>
          <label htmlFor="report_file" className="block text-sm font-medium text-purple-600 mb-2">
            Upload Report
          </label>
          <input
            type="file"
            name="report_file"
            onChange={handleFileChange}
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>

      {/* Response Message */}
      {responseMessage && (
        <p
          className={`mt-6 p-3 text-center text-sm rounded-md ${
            responseType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default CreateReportForm;
