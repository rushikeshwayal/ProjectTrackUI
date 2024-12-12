import React, { useState } from 'react';

const FormII = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/post/form-ii', {
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
              Fund Requisition (Form - II)
            </h1>
            ${printContent}
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
      <h2 className="text-3xl font-bold text-purple-800 text-center mb-8">Form II</h2>
      <form id="form-print-section" onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'project_id', label: 'Project ID', type: 'text', required: true },
            { name: 'project_code', label: 'Project Code', type: 'text', required: true },
            { name: 'company_name', label: 'Company Name', type: 'text', required: true },
            { name: 'year_or_period', label: 'Year or Period', type: 'text', required: true },
            { name: 'total_approved_cost', label: 'Total Approved Cost', type: 'number', required: true },
            { name: 'total_fund_received', label: 'Total Fund Received', type: 'number', required: true },
            { name: 'interest_earned', label: 'Interest Earned', type: 'number' },
            { name: 'expenditure_incurred', label: 'Expenditure Incurred', type: 'number', required: true },
            { name: 'balance_fund_available', label: 'Balance Fund Available', type: 'number', required: true },
            { name: 'fund_provision', label: 'Fund Provision', type: 'text', required: true },
            { name: 'fund_required', label: 'Fund Required', type: 'text', required: true },
            { name: 'land_building', label: 'Land Building', type: 'number' },
            { name: 'capital_equipment', label: 'Capital Equipment', type: 'number' },
            { name: 'manpower', label: 'Manpower', type: 'number' },
            { name: 'consumables', label: 'Consumables', type: 'number' },
            { name: 'travel', label: 'Travel', type: 'number' },
            { name: 'contingencies', label: 'Contingencies', type: 'number' },
            { name: 'workshop_seminar', label: 'Workshop/Seminar', type: 'number' },
            { name: 'associate_finance_officer', label: 'Associate Finance Officer', type: 'text', required: true },
            { name: 'project_leader', label: 'Project Leader', type: 'text', required: true },
            { name: 'signature_finance_officer', label: 'Signature (Finance Officer)', type: 'text', required: true },
            { name: 'signature_project_leader', label: 'Signature (Project Leader)', type: 'text', required: true },
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
            Submit Form II
          </button>
        </div>
      </form>
      {message && <div className="mt-6 text-center text-green-600 font-medium">{message}</div>}
    </div>
  );
};

export default FormII;
