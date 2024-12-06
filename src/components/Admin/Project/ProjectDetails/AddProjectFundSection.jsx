import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddProjectFund = () => {
  const { projectId } = useParams(); // Extract `project_id` from URL params
  console.log("project ID",projectId)
  const [formData, setFormData] = useState({
    project_id: projectId,
    fund_amount: '',
    fund_releasing_authority: '',
    project_phase: '',
    fund_release_date: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const dataToSend = {
      ...formData,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/post/project_fund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setFormData({
            project_id:'',
          fund_amount: '',
          fund_releasing_authority: '',
          project_phase: '',
          fund_release_date: ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Add Project Fund</h1>
      {message && <p className="mb-4 text-green-700 font-semibold">{message}</p>}
      {error && <p className="mb-4 text-red-700 font-semibold">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fund_amount" className="block text-gray-700 font-semibold">
            Fund Amount
          </label>
          <input
            type="number"
            id="fund_amount"
            name="fund_amount"
            value={formData.fund_amount}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fund_releasing_authority" className="block text-gray-700 font-semibold">
            Fund Releasing Authority
          </label>
          <input
            type="text"
            id="fund_releasing_authority"
            name="fund_releasing_authority"
            value={formData.fund_releasing_authority}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="project_phase" className="block text-gray-700 font-semibold">
            Project Phase
          </label>
          <input
            type="text"
            id="project_phase"
            name="project_phase"
            value={formData.project_phase}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fund_release_date" className="block text-gray-700 font-semibold">
            Fund Release Date
          </label>
          <input
            type="date"
            id="fund_release_date"
            name="fund_release_date"
            value={formData.fund_release_date}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProjectFund;
