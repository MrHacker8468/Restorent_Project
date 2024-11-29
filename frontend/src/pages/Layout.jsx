import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black 
                    font-['Roboto'] text-gray-200">
      <nav className="bg-gray-800/90 backdrop-blur-sm shadow-xl py-4 px-6 
                      transition-all duration-300 transform 
                      sticky top-0 z-50 border-b border-gray-700">
        <ul className="flex space-x-10 justify-center items-center">
          <li>
            <Link 
              to="/" 
              className="text-lg font-semibold text-gray-300 
                         hover:text-amber-500 transition-all duration-300 
                         hover:scale-110 hover:tracking-wider 
                         flex items-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/menu" 
              className="text-lg font-semibold text-gray-300 
                         hover:text-amber-500 transition-all duration-300 
                         hover:scale-110 hover:tracking-wider 
                         flex items-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-6 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Menu
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className="text-lg font-semibold text-gray-300 
                         hover:text-amber-500 transition-all duration-300 
                         hover:scale-110 hover:tracking-wider 
                         flex items-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Login
            </Link>
          </li>
          <li>
            <Link 
              to="/register" 
              className="text-lg font-semibold text-gray-300 
                         hover:text-amber-500 transition-all duration-300 
                         hover:scale-110 hover:tracking-wider 
                         flex items-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </Link>
          </li>
        </ul>
      </nav>

      <main className="container mx-auto px-4 py-8 relative">
        <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 
                        transform transition-all duration-500 hover:shadow-3xl 
                        border border-gray-700 hover:-translate-y-2">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                          bg-amber-600 rounded-full p-4 shadow-lg 
                          hover:rotate-6 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <Outlet />
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-6 mt-8 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-amber-500 transition-colors">About Us</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Reservations</a>
          </div>
          <p className="text-sm opacity-70 hover:opacity-100 transition-opacity">
            © 2024 Delicious Bites Restaurant | Savor Every Moment
          </p>
        </div>
      </footer>
    </div>
  )
}