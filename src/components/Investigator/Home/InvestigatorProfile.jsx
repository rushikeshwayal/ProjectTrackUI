import React, { useEffect, useState } from 'react';
import MinistryLogos from '../../Common/MinistryLogos';
import ProfilePng from '../../../assets/Profile.png';
import { useAuth } from '../../context/AuthContext';

const InvestigatorProfile = () => {
  const { user } = useAuth();
  const [userID, setUserID] = useState(null);
  const [investigator, setInvestigator] = useState({
    image: ProfilePng,
    investigator_name: '',
    email: '',
    phone_no: '',
    account_number: '',
    designation: '',
    experience: '',
    dob: '',
    address: '',
    department: '',
    authority: '',
    security_clearance: '',
    highest_qualification: '',
    identification: '',
    username: '',
    password: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestigator((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetch investigator data when userID is available
  useEffect(() => {
    if (user && user.ID) {
      setUserID(user.ID);
    }
  }, [user]);

  useEffect(() => {
    if (userID) {
      console.log('Extracted Investigator ID from user:', userID);
      fetch(`http://127.0.0.1:5000/api/investigator/${userID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched investigator data:', data);
          setInvestigator({
            ...investigator,
            investigator_name: data.investigator_name,
            email: data.email,
            phone_no: data.phone_no,
            account_number: data.account_number,
            designation: data.designation,
            experience: data.experience,
            dob: new Date(data.dob).toISOString().split('T')[0],
            address: data.address,
            department: data.department,
            authority: data.authority,
            security_clearance: data.security_clearance,
            highest_qualification: data.highest_qualification,
            identification: data.identification,
            username: data.username,
            password: data.password
          });
        })
        .catch((error) => console.error('Error fetching investigator data:', error));
    }
  }, [userID]);

  // Handle profile update
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      investigator_name: investigator.investigator_name,
      email: investigator.email,
      phone_no: investigator.phone_no,
      account_number: investigator.account_number,
      designation: investigator.designation,
      experience: investigator.experience,
      dob: investigator.dob,
      address: investigator.address,
      department: investigator.department,
      authority: investigator.authority,
      security_clearance: investigator.security_clearance,
      highest_qualification: investigator.highest_qualification,
      identification: investigator.identification,
      username: investigator.username,
      password: investigator.password
    };

    fetch(`http://127.0.0.1:5000/api/investigator/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          console.error(`Failed to update: ${response.status} ${response.statusText}`);
          throw new Error('Failed to update profile. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Profile updated successfully:', data);
        alert('Profile updated successfully!');
        setIsEditing(false); // Exit editing mode after successful update
      })
      .catch((error) => {
        console.error('Error during PUT request:', error.message);
        alert(`Update failed: ${error.message}`);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      {/* Ministry Logos */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between shadow-md">
        <MinistryLogos />
      </div>

      <div className="font-bold text-xl mt-48 ml-32">
        <a href="/admin" className="text-purple-700 hover:text-purple-900">
          ◁ Home
        </a>
      </div>

      {/* Profile Container */}
      <div className="flex flex-col items-center mt-16 p-8">
        {/* Profile Header */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <img
            src={investigator.image}
            alt="Investigator"
            className="w-32 h-32 rounded-full border-4 border-purple-700 shadow-lg"
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-700">{investigator.investigator_name}</h1>
            <h2 className="text-xl text-gray-600">{investigator.designation}</h2>
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleUpdate}>
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Add all input fields similarly as in AdminProfile */}
              <div>
                <p className="text-gray-700 font-semibold">Email</p>
                <input
                  type="email"
                  name="email"
                  value={investigator.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Email</p>
                <input
                  type="email"
                  name="email"
                  value={investigator.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Email</p>
                <input
                  type="email"
                  name="email"
                  value={investigator.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
            </div>

            {/* Edit Button and Submit */}
            <div className="mt-8">
              {isEditing ? (
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-6 py-2 rounded-md shadow-md"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-700 text-white px-6 py-2 rounded-md shadow-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvestigatorProfile;
