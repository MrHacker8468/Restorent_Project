import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  ChefHat, 
  Utensils, 
  Clock, 
  ShoppingCart, 
  Star, 
  Truck 
} from 'lucide-react';

import Pasta from '../Image/pasta.jpeg';
import GrilledSalmon from '../Image/grilled_salmon.jpeg';
import ChocolateLavaCake from '../Image/Ch_lava_cake.jpg';

export default function Home() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          };
          const response = await axios.get('http://127.0.0.1:8000/api/user/', config);
          setIsLoggedIn(true);
          setUsername(response.data.username);
        } else {
          setIsLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      const access_token = localStorage.getItem('access_token');

      if (refresh_token) {
        await axios.post(
          'http://127.0.0.1:8000/api/logout/',
          { refresh: refresh_token },
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
        setUsername("");
      }
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    }
  };

  const features = [
    {
      icon: <ChefHat className="w-12 h-12 text-amber-500" />,
      title: "Artisan Cuisine",
      description: "Crafted by world-class chefs using locally sourced, fresh ingredients."
    },
    {
      icon: <Utensils className="w-12 h-12 text-amber-500" />,
      title: "Diverse Menu",
      description: "From classic favorites to innovative culinary creations, we have something for everyone."
    },
    {
      icon: <Clock className="w-12 h-12 text-amber-500" />,
      title: "Quick Delivery",
      description: "Hot, fresh meals delivered to your doorstep in under 45 minutes."
    }
  ];

  const specialOffers = [
    {
      title: "Weekend Chef's Special",
      description: "Exclusive tasting menu available only on weekends",
      discount: "20% Off"
    },
    {
      title: "Family Feast Package",
      description: "Complete meal for 4 at unbeatable prices",
      discount: "25% Off"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black 
                    text-gray-200 font-['Roboto'] flex flex-col">
      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12">
        {isLoggedIn ? (
          <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl 
                          p-8 md:p-12 w-full max-w-2xl space-y-6 
                          transform transition-all duration-500 hover:shadow-3xl 
                          border border-gray-700 mx-auto">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-4 animate-pulse">
                Welcome Back, {username}!
              </h1>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Link
                  to="/menu"
                  className="bg-amber-600 text-white py-3 px-6 rounded-lg 
                             hover:bg-amber-700 transition-colors duration-300 
                             flex items-center justify-center space-x-2 
                             transform hover:scale-105 
                             border border-amber-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>View Menu</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-gray-700 text-gray-300 py-3 px-6 rounded-lg 
                             hover:bg-red-600 transition-colors duration-300 
                             flex items-center justify-center space-x-2 
                             transform hover:scale-105 
                             border border-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl 
                          p-8 md:p-12 w-full max-w-2xl space-y-6 
                          transform transition-all duration-500 hover:shadow-3xl 
                          border border-gray-700 mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-6">
                Delicious Bites
              </h1>

              <p className="text-gray-400 mb-8 text-lg max-w-xl mx-auto">
                Embark on a culinary journey that tantalizes your taste buds and brings joy to your dining experience.
              </p>

              <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                <Link
                  to="/login"
                  className="bg-amber-600 text-white py-3 px-6 rounded-lg 
                             hover:bg-amber-700 transition-colors duration-300 
                             flex items-center justify-center space-x-2 
                             transform hover:scale-105 
                             border border-amber-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="bg-gray-700 text-gray-300 py-3 px-6 rounded-lg 
                             hover:bg-gray-600 transition-colors duration-300 
                             flex items-center justify-center space-x-2 
                             transform hover:scale-105 
                             border border-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Register</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!isLoggedIn && (
          <div className="mt-16 w-full max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/70 p-6 rounded-lg shadow-md text-center 
                             transition-all duration-300 hover:shadow-xl 
                             hover:bg-gray-800/90 border border-gray-700"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-amber-500 mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Offers */}
        {!isLoggedIn && (
          <div className="w-full max-w-4xl mx-auto mb-16">
            <div className="bg-gray-800/70 rounded-lg shadow-md p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-center text-amber-500 mb-8">
                Special Offers
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {specialOffers.map((offer, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900/50 p-6 rounded-lg border-2 border-amber-500 
                               transform transition-transform hover:scale-105"
                  >
                    <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                      {offer.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{offer.description}</p>
                    <div className="bg-amber-500 text-white px-4 py-2 rounded-full inline-block">
                      {offer.discount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Featured Dishes Section */}
        {isLoggedIn && (
          <div className="mt-8 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-amber-500 mb-4 text-center">
              Today's Special Dishes
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Pasta Primavera', description: 'Fresh veggies and pasta in a light sauce', img: Pasta },
                { name: 'Grilled Salmon', description: 'Served with lemon butter sauce', img: GrilledSalmon },
                { name: 'Chocolate Lava Cake', description: 'Rich chocolate dessert with molten center', img: ChocolateLavaCake }
              ].map((dish, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-md p-4 text-center 
                            transform transition-all duration-300 hover:scale-105 
                            hover:shadow-lg border border-gray-700"
                >
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-32 object-cover rounded-t-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-300 hover:text-amber-500 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{dish.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}