import React, { useState } from 'react';

const FormIII = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/post/form-iii', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message || 'Form submitted successfully!');
    } catch (error) {
      setMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">Form III</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'project_id', label: 'Project ID', type: 'text', required: true },
            { name: 'quarter_end_date', label: 'Quarter End Date', type: 'date', required: true },
            { name: 'land_building_cost', label: 'Land Building Cost', type: 'number' },
            { name: 'capital_equipment_cost', label: 'Capital Equipment Cost', type: 'number' },
            { name: 'manpower_cost', label: 'Manpower Cost', type: 'number' },
            { name: 'consumable_cost', label: 'Consumable Cost', type: 'number' },
            { name: 'ta_da_cost', label: 'TA/DA Cost', type: 'number' },
            { name: 'contingencies_cost', label: 'Contingencies Cost', type: 'number' },
            { name: 'seminar_cost', label: 'Seminar Cost', type: 'number' },
            { name: 'other_costs', label: 'Other Costs', type: 'number' },
            { name: 'funds_advanced', label: 'Funds Advanced', type: 'number' },
            { name: 'expenditure_incurred', label: 'Expenditure Incurred', type: 'number' },
            { name: 'unspent_balance', label: 'Unspent Balance', type: 'number' },
          ].map((field, index) => (
            <div key={index} className="col-span-1">
              <label className="block text-gray-700 font-medium mb-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required={field.required}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Submit Form III
          </button>
        </div>
      </form>
      {message && <div className="mt-6 text-center text-green-600 font-medium">{message}</div>}
    </div>
  );
};

export default FormIII;
