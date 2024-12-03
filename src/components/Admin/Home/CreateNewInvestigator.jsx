import React, { useState } from 'react';
import MinistryLogos from '../../Common/MinistryLogos';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const AddInvestigator = () => {
  const [formData, setFormData] = useState({
    investigator_name: '',
    email: '',
    phone_no: '',
    dob: '',
    address: '',
    username: '',
    password: '',
    experience: '',
    account_number: '',
    security_clearance: '',
    highest_qualification: '',
    designation: '',
    authority: 'Investigator', // Default value
    identification: '',
    department: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const validateForm = () => {
    const validationErrors = {};
    if (formData.username.length < 5) {
      validationErrors.username = 'Username must be at least 5 characters long.';
    }
    if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long.';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage('Please correct the errors in the form.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/post/investigator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Investigator added successfully!');
        setIsSuccessVisible(true);
        setTimeout(() => setIsSuccessVisible(false), 3000);
        setFormData({
          investigator_name: '',
          email: '',
          phone_no: '',
          dob: '',
          address: '',
          username: '',
          password: '',
          experience: '',
          account_number: '',
          security_clearance: '',
          highest_qualification: '',
          designation: '',
          authority: 'Investigator',
          identification: '',
          department: '',
        });
      } else {
        setErrorMessage('Failed to add investigator. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <MinistryLogos />
      </div>
      <div className="flex-grow mt-[120px] p-8">
        <NavBar />
        <Link
          to="/create/project"
          className="top-40 left-8 text-lg font-medium text-purple-600 bg-gray-50 py-2 px-6 mb-40 rounded-lg hover:bg-purple-100 hover:text-purple-800 transition z-50"
        >
          ◁ Back
        </Link>
        <div className="flex-grow p-8">
          <div className="bg-white p-8 mt-14 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-20">
              Add Investigator
            </h1>

            {errorMessage && <p className="text-red-600 z-50 text-center mt-4">{errorMessage}</p>}
            {successMessage && (
              <div
                className={`fixed top-8 right-8 p-4 z-50 bg-green-600 text-white rounded-lg shadow-md transition-all ease-in-out duration-500 transform ${
                  isSuccessVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Investigator Name', name: 'investigator_name', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { label: 'Phone No', name: 'phone_no', type: 'tel' },
                  { label: 'Date of Birth', name: 'dob', type: 'date' },
                  { label: 'Address', name: 'address', type: 'text' },
                  { label: 'Username', name: 'username', type: 'text' },
                  { label: 'Password', name: 'password', type: 'password' },
                  { label: 'Experience', name: 'experience', type: 'text' },
                  { label: 'Account Number', name: 'account_number', type: 'text' },
                  { label: 'Security Clearance', name: 'security_clearance', type: 'text' },
                  { label: 'Highest Qualification', name: 'highest_qualification', type: 'text' },
                  { label: 'Designation', name: 'designation', type: 'text' },
                  { label: 'Identification', name: 'identification', type: 'text' },
                  { label: 'Department', name: 'department', type: 'text' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      required
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="py-2 px-6 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                >
                  Add Investigator
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvestigator;
