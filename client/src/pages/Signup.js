import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'visitor',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.username || !formData.email || !formData.password) {
      return setError('All fields are required');
    }

    if (formData.password.length < 4 || formData.password.length > 10) {
      return setError('Password must be 4 to 10 characters long');
    }

    if (!formData.email.includes('@')) {
      return setError('Invalid email format');
    }

    try {
      
      console.log(JSON.stringify(formData))
      const response = await axios.post('http://localhost:5000/signup', formData);
    
      
      alert(response.data);
    
     
      const encryptedPassword = btoa(formData.password);
      localStorage.setItem('user', JSON.stringify({
        ...formData,
        password: encryptedPassword
      }));

      navigate('/');
    
    } catch (err) {
      console.error("Signup error:", err);
    
     
      const errorMessage =
        err.response?.data ||
        err.response?.data?.message || 
        'Signup failed. Please try again.';
      setError(errorMessage); 
     
    }
    
  };

  return (
    <>
    <Layout/>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-4">Signup</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">Role:</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="visitor">Visitor</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </>
 
  );
}

export default Signup;
