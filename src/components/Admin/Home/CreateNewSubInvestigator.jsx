import React, { useState } from 'react';
import MinistryLogos from "../../Common/MinistryLogos";
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CreateNewSubInvestigator() {
  const [formData, setFormData] = useState({
    sub_investigator_name: '',
    phone_no: '',
    email: '',
    dob: '',
    designation: '',
    department: '',
    identification: '',
    experience: '',
    address: '',
    highest_qualification: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    // Validate phone number (example: 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone_no)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      setIsLoading(false);
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/post/sub_investigator', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Sub-Investigator created successfully:', response.data);
      setSuccessMessage('Sub-Investigator created successfully!');
      setIsSuccessVisible(true);
      
      // Reset form after successful submission
      setFormData({
        sub_investigator_name: '',
        phone_no: '',
        email: '',
        dob: '',
        designation: '',
        department: '',
        identification: '',
        experience: '',
        address: '',
        highest_qualification: '',
      });

      setTimeout(() => {
        setIsSuccessVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating Sub-Investigator:', error);
      if (error.response) {
        setErrorMessage(`Failed to create Sub-Investigator: ${error.response.data.message || 'Please try again later.'}`);
      } else {
        setErrorMessage('Failed to create Sub-Investigator. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <MinistryLogos />
      </div>

      <div className="flex-grow mt-[120px] p-8">
        <NavBar />
        
        <Link
          to="/create/project"
          className=" top-40 left-8 text-lg font-medium text-purple-600 bg-gray-50 py-2 px-6 mb-40 rounded-lg hover:bg-purple-100 hover:text-purple-800 transition z-50"
        >
          ◁ Back
        </Link>

        <div className="bg-white p-8 mt-14 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-20">
            Create New Sub-Investigator
          </h1>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sub-Investigator Name</label>
                <input
                  type="text"
                  name="sub_investigator_name"
                  value={formData.sub_investigator_name}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Identification</label>
                <input
                  type="text"
                  name="identification"
                  value={formData.identification}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                <input
                  type="text"
                  name="highest_qualification"
                  value={formData.highest_qualification}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="py-2 px-6 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Sub-Investigator'}
              </button>
            </div>

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
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewSubInvestigator;
