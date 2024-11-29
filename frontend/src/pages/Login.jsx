import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      setSuccessMessage('Login Successful');
      localStorage.setItem('access_token', response.data.token.access);
      localStorage.setItem('refresh_token', response.data.token.refresh);
      navigate('/');
    } catch (error) {
      console.error(error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((key) => {
          const errorMessage = error.response.data[key];
          if (errorMessage && errorMessage.length > 0) {
            setError(errorMessage[0]);
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200">
      <div className="bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-amber-500 mb-6">Login</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 border border-red-500 rounded-md p-2 bg-red-900/30">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4 border border-green-500 rounded-md p-2 bg-green-900/30">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-all ${
              isLoading ? 'bg-gray-500' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-amber-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
