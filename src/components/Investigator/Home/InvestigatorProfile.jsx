import React, { useEffect, useState } from "react";
import MinistryLogos from "../../Common/MinistryLogos";
import ProfilePng from "../../../assets/Profile.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const InvestigatorProfile = () => {
  const { user } = useAuth();
  const [userID, setUserID] = useState(null);
  const [investigator, setInvestigator] = useState({
    image: ProfilePng,
    investigator_name: "",
    email: "",
    phone_no: "",
    dob: " ",
    address: " ",
    specialization: "",
    experience: "",
    department: "",
    authority: "",
    highest_qualification: "",
    identification: "",
    username: "",
    password: "",
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
      fetch(`http://127.0.0.1:5000/api/investigator/${userID}`)
        .then((response) => response.json())
        .then((data) => {
          setInvestigator({
            ...investigator,
            investigator_name: data.investigator_name,
            email: data.email,
            phone_no: data.phone_no,
            dob: new Date(data.dob).toISOString().split("T")[0],
            address: data.address,
            specialization: data.specialization,
            experience: data.experience,
            department: data.department,
            authority: data.authority,
            highest_qualification: data.highest_qualification,
            identification: data.identification,
            username: data.username,
            password: data.password,
          });
        })
        .catch((error) => console.error("Error fetching investigator data:", error));
    }
  }, [userID]);

  // Handle profile update
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      investigator_name: investigator.investigator_name,
      email: investigator.email,
      phone_no: investigator.phone_no,
      dob: investigator.dob,
      address: investigator.address,
      specialization: investigator.specialization,
      experience: investigator.experience,
      department: investigator.department,
      authority: investigator.authority,
      highest_qualification: investigator.highest_qualification,
      identification: investigator.identification,
      username: investigator.username,
      password: investigator.password,
    };

    fetch(`http://127.0.0.1:5000/api/put/investigator/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      {/* Ministry Logos */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between shadow-md">
  <MinistryLogos />
</div>

<div className="font-bold text-xl mt-48 ml-32">
  <a href="/investigator" className="text-purple-700 hover:text-purple-900">
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
      <h1 className="text-4xl font-bold text-purple-700">{investigator.name}</h1>
      <h2 className="text-xl text-gray-600">{investigator.role}</h2>
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
            value={investigator.email}
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
            value={investigator.phone_no}
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
            value={investigator.dob}
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
            value={investigator.address}
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
          <p className="text-gray-700 font-semibold">Role</p>
          <input
            type="text"
            name="role"
            value={investigator.authority}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <p className="text-gray-700 font-semibold">Department</p>
          <input
            type="text"
            name="domain"
            value={investigator.department}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <p className="text-gray-700 font-semibold">Identification</p>
          <input
            type="text"
            name="projects"
            value={investigator.identification}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />
  </div>
</div>
  {/* other INFO */}
<h3 className="text-3xl font-bold mb-4 text-purple-700">Other Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-700 font-semibold">specialization</p>
          <input
            type="text"
            name="role"
            value={investigator.specialization}
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
            value={investigator.experience}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />
        </div>
</div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-5 mt-16">
              <div>
                <Link to="/login">
                  <button type="button" className="px-6 py-2 bg-red-700 text-white rounded-lg">
                    Log-Out
                  </button>
                </Link>
              </div>
              <div className="mt-5 gap-20 space-x-10 ml-20">
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

export default InvestigatorProfile;
