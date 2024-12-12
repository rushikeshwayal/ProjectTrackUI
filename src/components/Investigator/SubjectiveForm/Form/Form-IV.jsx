import React, { useState, useEffect } from 'react';

const FormIV = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/form-iv');
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/post/form-iv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message || 'Form submitted successfully!');
      fetchForms(); // Refresh forms list
    } catch (error) {
      setMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">Form IV</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'project_id', label: 'Project ID', type: 'text', required: true },
            { name: 'project_title', label: 'Project Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', required: true },
            { name: 'amount_requested', label: 'Amount Requested', type: 'number', required: true },
            { name: 'amount_allocated', label: 'Amount Allocated', type: 'number' },
            { name: 'status', label: 'Status', type: 'text' },
            { name: 'remarks', label: 'Remarks', type: 'textarea' },
            { name: 'created_date', label: 'Created Date', type: 'date', required: true },
            { name: 'modified_date', label: 'Modified Date', type: 'date' },
          ].map((field, index) => (
            <div key={index} className="col-span-1">
              <label className="block text-gray-700 font-medium mb-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  placeholder={field.label}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required={field.required}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Submit Form IV
          </button>
        </div>
      </form>
      {message && <div className="mt-6 text-center text-green-600 font-medium">{message}</div>}

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-purple-800 mb-4">Existing Forms</h3>
        <ul className="space-y-4">
          {forms.map((form) => (
            <li key={form.id} className="bg-white p-4 rounded-md shadow-md">
              <p><strong>Project ID:</strong> {form.project_id}</p>
              <p><strong>Project Title:</strong> {form.project_title}</p>
              <p><strong>Status:</strong> {form.status}</p>
              <p><strong>Created Date:</strong> {form.created_date}</p>
              <p><strong>Remarks:</strong> {form.remarks}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormIV;