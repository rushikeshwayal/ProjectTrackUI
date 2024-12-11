import React, { useState, useEffect } from 'react';

// Helper functions for date and time
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0]; // Format: HH:MM:SS
};

const UpdateProjectStatus = () => {
  const [formData, setFormData] = useState({
    phase: '',
    description: '',
    date_of_updation: getCurrentDate(),
    time_of_updation: getCurrentTime(),
    project_id: '',
  });

  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the list of projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/project');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Validate that all required fields are filled
    if (!formData.phase || !formData.project_id) {
      setError('Phase and Project fields are required.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/post/project_status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || 'Project status updated successfully.');
        setFormData({
          phase: '',
          description: '',
          date_of_updation: getCurrentDate(),
          time_of_updation: getCurrentTime(),
          project_id: '',
        });
      } else {
        setError(result.error || 'Failed to update project status.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Project Status</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phase" className="block text-gray-700 font-medium mb-2">Phase:</label>
          <input
            type="text"
            id="phase"
            name="phase"
            value={formData.phase}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter project phase"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter project description"
          ></textarea>
        </div>

        <div>
          <label htmlFor="project_id" className="block text-gray-700 font-medium mb-2">Project:</label>
          <select
            id="project_id"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="" disabled>Select a project</option>
            {projects.length > 0 ? (
              projects.map((project) => (
                <option key={project.project_id} value={project.project_id}>
                  {project.project_id} - {project.project_name}
                </option>
              ))
            ) : (
              <option value="" disabled>No projects available</option>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default UpdateProjectStatus;
