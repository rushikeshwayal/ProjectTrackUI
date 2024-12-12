import React, { useState } from "react";
import axios from "axios";

function AdminRegistration() {
  const [formData, setFormData] = useState({
    admin_name: "",
    email: "",
    phone_no: "",
    dob: "",
    address: "",
    username: "",
    password: "",
    experience: "",
    account_number: "",
    security_clearance: "",
    highest_qualification: "",
    designation: "",
    authority: "",
    identification: "",
    department: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/post/admin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Admin registered successfully!");
      setFormData({
        admin_name: "",
        email: "",
        phone_no: "",
        dob: "",
        address: "",
        username: "",
        password: "",
        experience: "",
        account_number: "",
        security_clearance: "",
        highest_qualification: "",
        designation: "",
        authority: "",
        identification: "",
        department: "",
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to register admin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-800">
          Admin Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Admin Name</label>
            <input
              type="text"
              name="admin_name"
              value={formData.admin_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="2"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Account Number</label>
            <input
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Security Clearance</label>
            <input
              type="text"
              name="security_clearance"
              value={formData.security_clearance}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Highest Qualification</label>
            <input
              type="text"
              name="highest_qualification"
              value={formData.highest_qualification}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Authority</label>
            <select
              name="authority"
              value={formData.authority}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="">Select Authority</option>
              <option value="Admin">Admin Head</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Identification</label>
            <input
              type="text"
              name="identification"
              value={formData.identification}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register Admin"}
          </button>
        </form>
        {successMessage && (
          <div className="mt-4 text-green-600 font-medium">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-600 font-medium">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}

export default AdminRegistration;
