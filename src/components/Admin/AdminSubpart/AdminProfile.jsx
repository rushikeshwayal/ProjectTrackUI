import React, { useEffect, useState } from 'react';
import MinistryLogos from '../../Common/MinistryLogos';
import ProfilePng from '../../../assets/Profile.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminProfile = () => {
  const { user } = useAuth();
  const [userID, setUserID] = useState(null);
  const [admin, setAdmin] = useState({
    image: ProfilePng,
    admin_name: '',
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
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetch admin data when userID is available
  useEffect(() => {
    if (user && user.ID) {
      setUserID(user.ID);
    }
  }, [user]);

  useEffect(() => {
    if (userID) {
      console.log('Extracted Admin ID from user:', userID);
      fetch(`http://127.0.0.1:5000/api/admin/${userID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched admin data:', data);
          setAdmin({
            ...admin,
            admin_name: data.admin_name,
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
        .catch((error) => console.error('Error fetching admin data:', error));
    }
  }, [userID]); // Dependency on userID

  // Handle profile update
  const handleUpdate = (e) => {
    // e.preventDefault();
    
    const updatedData = {
      admin_name: admin.admin_name,
      email: admin.email,
      phone_no: admin.phone_no,
      account_number: admin.account_number,
      designation: admin.designation,
      experience: admin.experience,
      dob: admin.dob,
      address: admin.address,
      department: admin.department,
      authority: admin.authority,
      security_clearance: admin.security_clearance,
      highest_qualification: admin.highest_qualification,
      identification: admin.identification,
      username: admin.username,
      password: admin.password
    };

    fetch(`http://127.0.0.1:5000/api/admin/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Profile updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
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
            src={admin.image}
            alt="Admin"
            className="w-32 h-32 rounded-full border-4 border-purple-700 shadow-lg"
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-purple-700">{admin.admin_name}</h1>
            <h2 className="text-xl text-gray-600">{admin.designation}</h2>
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          {/* Personal Information */}
          <h3 className="text-3xl font-bold mb-4 text-purple-700">Personal Information</h3>
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-700 font-semibold">Email</p>
                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Phone</p>
                <input
                  type="text"
                  name="phone_no"
                  value={admin.phone_no}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Date of Birth</p>
                <input
                  type="date"
                  name="dob"
                  value={admin.dob}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Address</p>
                <input
                  type="text"
                  name="address"
                  value={admin.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Professional Information */}
            <h3 className="text-3xl font-bold mb-4 text-purple-700">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-700 font-semibold">Designation</p>
                <input
                  type="text"
                  name="designation"
                  value={admin.designation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Experience</p>
                <input
                  type="text"
                  name="experience"
                  value={admin.experience}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Department</p>
                <input
                  type="text"
                  name="department"
                  value={admin.department}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Additional Information */}
            <h3 className="text-3xl font-bold mb-4 text-purple-700">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 font-semibold">Account Number</p>
                <input
                  type="text"
                  name="account_number"
                  value={admin.account_number}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Identification</p>
                <input
                  type="text"
                  name="identification"
                  value={admin.identification}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Username</p>
                <input
                  type="text"
                  name="username"
                  value={admin.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Highest Qualification</p>
                <input
                  type="text"
                  name="highest_qualification"
                  value={admin.highest_qualification}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {/* <div>
                <p className="text-gray-700 font-semibold">Password</p>
                <input
                  type="password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md"
                />
              </div> */}
            </div>

            {/* Action Buttons */}
            <div className='flex justify-between space-x-5 mt-16'>
            <div>
              <Link to="/">
              <button
                type="button"
                 className="px-6 py-2 bg-red-700 text-white rounded-lg"
              >
                Log-Out
              </button>
              </Link>
            </div>
            <div className=" mt-5 gap-20 space-x-10 ml-20 ">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 ml-10 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => handleUpdate}
                    className="px-6 py-2 ml-10 bg-purple-700 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 ml-10 bg-purple-700 text-white rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
