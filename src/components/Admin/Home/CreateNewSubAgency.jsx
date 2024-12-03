import React, { useState } from 'react';
import MinistryLogos from "../../Common/MinistryLogos";
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CreateNewSubAgency() {
  const [formData, setFormData] = useState({
    sub_agency_name: '',
    phone_no: '',
    email: '',
    sub_agency_professionals: '',
    head_of_agency: '',
    address: '',
    established_date: '',
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

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/post/sub_agency', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Agency created successfully:', response.data);
      setSuccessMessage('Agency created successfully!');
      setIsSuccessVisible(true);
      // Reset form after successful submission
      setFormData({
        sub_agency_name: '',
        phone_no: '',
        email: '',
        sub_agency_professionals: '',
        head_of_agency: '',
        address: '',
        established_date: '',
      });

      setTimeout(() => {
        setIsSuccessVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating agency:', error);
      if (error.response) {
        setErrorMessage(`Failed to create agency: ${error.response.data.message || 'Please try again later.'}`);
      } else {
        setErrorMessage('Failed to create agency. Please try again later.');
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
            className="absolute top-40 left-8 text-lg font-medium text-purple-600 bg-gray-50 py-2 px-6 mb-40 rounded-lg hover:bg-purple-100 hover:text-purple-800 transition z-50"
          >
            ◁ Back
          </Link>

        <div className="bg-white p-8 mt-20 rounded-lg shadow-lg">

         

          <h1 className="text-3xl font-bold text-gray-800 text-center mb-20">
            Create New Sub Agency
          </h1>
          <form onSubmit={handleSubmit} className="space-y-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sub Agency Name</label>
                <input
                  type="text"
                  name="sub_agency_name"
                  value={formData.sub_agency_name}
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
                <label className="block text-sm font-medium text-gray-700">Agency Professionals</label>
                <textarea
                type="text"
                  name="sub_agency_professionals"
                  value={formData.sub_agency_professionals}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Head Of Agency</label>
                <input
                  type="text"
                  name="head_of_agency"
                  value={formData.head_of_agency}
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
                <label className="block text-sm font-medium text-gray-700">Established Date</label>
                <input
                  type="date"
                  name="established_date"
                  value={formData.established_date}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="py-2 px-6 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none transition"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>

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
        </div>
      </div>
    </div>
  );
}

export default CreateNewSubAgency;
