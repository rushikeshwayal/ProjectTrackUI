import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MinistryLogos from '../Common/MinistryLogos';
import LoginImg from '../../assets/login.jpg'; // Ensure this path is correct
// import { useAuth } from '../context/AuthContext';

// import useAuth from '../context/AuthContext';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Map roles to API endpoints and authorities
  const roleMap = {
    'Project Investigator': {
      endpoint: 'http://127.0.0.1:5000/api/investigator',
      authority: 'Investigator'
    },
    'Admin Console': {
      endpoint: 'http://127.0.0.1:5000/api/admin',
      authority: 'Admin Head'
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const { endpoint, authority } = roleMap[role];
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`); // Corrected template literal
      }

      const result = await response.json();
      console.log('API data:', result);

      const user = result.find((user) =>
        user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        user.password === password &&
        user.authority === authority
      );

      if (user) {
        console.log(`Navigating to: ${role === 'Admin Console' ? '/admin' : '/investigator/dashboard'}`);
        navigate('/admin');
        const updatedUser = {
          ...user,
          UniqeID: user.authority === 'Admin Head' ? user.adminUniqe_id : user.investigatorUniqe_id,
          ID: user.authority === 'Admin Head' ? user.admin_id : user.investigator_id
        };
        
        console.log(updatedUser);
        
        login({
          email: updatedUser.email,
          role: updatedUser.authority,
          UniqeID: updatedUser.UniqeID,
          ID: updatedUser.ID
        });
        navigate(role === 'Admin Console' ? '/admin' : '/investigator/dashboard');
      } else {
        setError('Invalid credentials or role.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <MinistryLogos />
        <div className="flex flex-wrap justify-center items-center h-[780px] bg-gray-100">
          <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-[70%]">
            {/* Image Section */}
            <div className="hidden md:block md:w-1/2">
              <img className="object-cover w-full h-full" src={LoginImg} alt="Login Visual" />
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-8">
              <div className='flex mb-8 justify-center'>
                <h1 className="text-3xl font-bold text-[#7ed957] text-center">Pragati.</h1>
                <h1 className="text-3xl font-bold text-gray-800 text-center">Track</h1>
              </div>
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Role Selection Buttons */}
                <div className='w-full flex justify-center items-center mt-6 gap-5'>
                  <button 
                    type="button" 
                    onClick={() => setRole('Project Investigator')} 
                    className={`text-purple-500 font-bold border-2 border-purple-500 py-2 px-6 rounded-lg transition duration-300 transform ${role === 'Project Investigator' ? 'bg-purple-500 text-white' : 'hover:bg-purple-500 hover:text-white'}`}
                  >
                    Investigator 
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setRole('Admin Console')} 
                    className={`text-purple-500 font-bold border-2 border-purple-500 py-2 px-6 rounded-lg transition duration-300 transform ${role === 'Admin Console' ? 'bg-purple-500 text-white' : 'hover:bg-purple-500 hover:text-white'}`}
                  >
                    Admin 
                  </button>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition duration-300"
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-4">
                <a href="#" className="text-sm text-purple-500 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
