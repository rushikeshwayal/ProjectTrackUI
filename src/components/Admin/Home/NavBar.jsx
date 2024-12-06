import { useState, useEffect } from 'react';
import ProfilePng from '../../../assets/Profile.png';
import NotificationPng from '../../../assets/notification-ring.png';

export default function NavBar() {
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/admin');
        const data = await response.json();
        if (data && data.length > 0) {
          const loggedInAdmin = data[0]; // Assuming the first admin in the response
          setAdminId(loggedInAdmin.admin_id); // Get the admin ID
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
  <div>
    <div className="fixed top-[140px] right-4 flex gap-5 z-50">
      <a href="/admin/notification">
        <img
          src={NotificationPng}
          alt="Notification"
          className="w-10 h-10 border-2 border-purple-500 rounded-full hover:opacity-80 transition duration-300"
        />
      </a>
      {adminId && (
        <a href={`/admin/profile/${adminId}`}>
          <img
            src={ProfilePng}
            alt="Profile"
            className="w-10 h-10 border-2 border-purple-500 rounded-full hover:opacity-80 transition duration-300"
          />
        </a>
      )}
    </div>
    </div>
  );
}
