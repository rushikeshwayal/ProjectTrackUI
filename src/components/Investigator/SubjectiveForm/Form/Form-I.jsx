import React, { useState } from 'react';

const FormI = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [digitalSignature, setDigitalSignature] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDigitalSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/post/form-i', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message || 'Form submitted successfully!');

      // Trigger print of the form section
      setTimeout(() => {
        const printContent = document.getElementById('form-print-section').innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = `
          <div>
            <h1 style="text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 20px;">
              Format for submission of Project proposal (Form - I)
            </h1>
            ${printContent}
            ${digitalSignature ? `<div style="margin-top: 20px; text-align: center;">
              <h3 style="font-size: 16px; font-weight: bold;">Digital Signature:</h3>
              <img src="${digitalSignature}" alt="Digital Signature" style="max-width: 200px; max-height: 100px;" />
            </div>` : ''}
          </div>`;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
      }, 500);
    } catch (error) {
      setMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">Form I</h2>
      <form id="form-print-section" onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dynamically generate fields based on backend */}
          {[
            { name: 'project_title', label: 'Project Title', type: 'text', required: true },
            { name: 'principal_agency_name', label: 'Principal Agency Name', type: 'text', required: true },
            { name: 'principal_agency_address', label: 'Principal Agency Address', type: 'text', required: true },
            { name: 'definition_of_issue', label: 'Definition of the Issue', type: 'textarea', required: true },
            { name: 'objectives', label: 'Objectives', type: 'textarea', required: true },
            { name: 'justification', label: 'Justification', type: 'textarea', required: true },
            { name: 'work_plan', label: 'Work Plan', type: 'textarea', required: true },
            { name: 'time_schedule', label: 'Time Schedule', type: 'textarea', required: true },
            { name: 'land_building_cost', label: 'Land & Building Cost', type: 'number', required: true },
            { name: 'equipment_cost', label: 'Equipment Cost', type: 'number', required: true },
            { name: 'salary_allowances', label: 'Salary Allowances', type: 'number', required: true },
            { name: 'travel_cost', label: 'Travel Cost', type: 'number', required: true },
            { name: 'total_cost', label: 'Total Cost', type: 'number', required: true },
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
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required={field.required}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>

        {/* Signature Area */}
        <div className="mt-8 border-t border-gray-300 pt-6">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Signature</h3>
          <div className="h-24 border border-gray-400 rounded-md flex items-center justify-center text-gray-500">
            <p>Signature (To be filled manually)</p>
          </div>
        </div>

        {/* Digital Signature Upload */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">Upload Digital Signature (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Submit Form I
          </button>
        </div>
      </form>
      {message && <div className="mt-6 text-center text-green-600 font-medium">{message}</div>}
    </div>
  );
};

export default FormI;