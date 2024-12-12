import React, { useState } from 'react';

const UploadForm = () => {
  const [formData, setFormData] = useState({ project_id: '', file_name: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.project_id || !formData.file_name || !file) {
      setMessage('Please fill all required fields and select a file.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('project_id', formData.project_id);
    formDataToSend.append('file_name', formData.file_name);
    formDataToSend.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/files/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'File uploaded successfully!');
        setFormData({ project_id: '', file_name: '' });
        setFile(null);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'An error occurred during file upload.');
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  const fileOptions = [
    'Format for submission of Project proposal (Form - I)',
    'Endorsement from Head of the Institution / Organisation (Form - IA)',
    'Fund Requisition (Form - II)',
    'Financial Expenditure Statement (Form - III)',
    'Expenditure statement for Equipment (Form - IV)',
    'Physical Progress Report (Form - V)',
    'Project Completion Report (Form - VI)',
    'Extension of Project Duration (Form - VII)',
    'Cost Revision or Re-appropriation (Form - VIII)',
    'List of Equipment procured in the past (Form - IX)',
    'List of Computer and Accessories Procured in the Past (Form - X)',
    'Justification of Salary & Wages (Form - XI)',
    'Justification for TA-DA (Form - XII)'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">File Upload Form</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Project ID</label>
          <input
            type="text"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">File Name</label>
          <select
            name="file_name"
            value={formData.file_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          >
            <option value="">Select a file name</option>
            {fileOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Select File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Upload File
          </button>
        </div>
      </form>

      {message && <div className="mt-6 text-center text-green-600 font-medium">{message}</div>}
    </div>
  );
};

export default UploadForm;
