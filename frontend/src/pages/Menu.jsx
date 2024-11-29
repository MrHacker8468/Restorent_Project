import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCart, Heart, Star, Minus, Plus, CheckCircle } from "lucide-react";
import Pasta from "../Image/pasta.jpeg";

// Initial state for categories
const categories = {
  mainCourse: [],
  beverages: [],
  salad: [],
};

export default function Menu() {
  const [cart, setCart] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [menu, setMenu] = useState(categories);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/menu/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const categorizedMenu = response.data.reduce((acc, item) => {
          const category = item.category.toLowerCase();
          if (!acc[category]) acc[category] = [];
          acc[category].push(item);
          return acc;
        }, {});

        setMenu(categorizedMenu);
      } catch (error) {
        console.error(
          "Error fetching menu:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchMenu();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem && existingItem.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) =>
        prevCart.filter((cartItem) => cartItem.name !== item.name)
      );
    }
  };

  const handleFeedback = (category, item, value) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [category]: {
        ...(prevFeedback[category] || {}),
        [item]: value,
      },
    }));
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      setOrderError("No items in cart");
      return false;
    }

    const totalPrice = cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );

    const orderDetails = {
      items: cart.map((item) => ({
        item_id: item.id,
        quantity: item.quantity || 1
      })),
      total_price: totalPrice,
      feedback,
    };

    const token = localStorage.getItem("access_token");

    if (!token) {
      setOrderError("Authentication token not found");
      return false;
    }

    setIsSubmitting(true);
    setOrderError(null);

    try {
      await axios.post("http://127.0.0.1:8000/api/order/", orderDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Reset states after successful submission
      setCart([]);
      setFeedback({});
      setSubmissionSuccess(true);
      setShowConfirmation(false);
      return true;
    } catch (error) {
      const errorMessage = error.response 
        ? error.response.data.detail || "Order submission failed" 
        : "Network error. Please try again.";
      
      setOrderError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderSubmission = () => {
    setShowConfirmation(true);
  };

  const confirmOrder = async () => {
    const success = await submitOrder();
    if (success) {
      setSubmissionSuccess(true);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white pb-32">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-amber-400 flex items-center">
            <Star className="mr-3 text-amber-500" size={40} />
            Our Menu
          </h1>
          <div className="relative">
            <ShoppingCart size={30} className="text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
              </span>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.keys(menu).map((category) => (
            <div key={category} className="bg-gray-800 rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-amber-400 capitalize border-b-2 border-amber-400 pb-2">
                {category}
              </h2>
              <div className="space-y-6">
                {menu[category].map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-700 rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300"
                  >
                    <img
                      src={Pasta}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <span className="text-amber-400 font-bold">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            className="bg-gray-600 p-2 rounded-full hover:bg-gray-500"
                            onClick={() => removeFromCart(item)}
                          >
                            <Minus size={16} />
                          </button>
                          <span>
                            {
                              cart.find((cartItem) => cartItem.name === item.name)
                                ?.quantity || 0
                            }
                          </span>
                          <button
                            className="bg-gray-600 p-2 rounded-full hover:bg-gray-500"
                            onClick={() => addToCart(item)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className={`p-2 rounded-full ${
                              feedback[category]?.[item.name] === "like"
                                ? "bg-green-500"
                                : "bg-gray-600 hover:bg-green-400"
                            }`}
                            onClick={() =>
                              handleFeedback(category, item.name, "like")
                            }
                          >
                            <Heart
                              size={16}
                              fill={
                                feedback[category]?.[item.name] === "like"
                                  ? "white"
                                  : "none"
                              }
                            />
                          </button>
                          <button
                            className={`p-2 rounded-full ${
                              feedback[category]?.[item.name] === "dislike"
                                ? "bg-red-500"
                                : "bg-gray-600 hover:bg-red-400"
                            }`}
                            onClick={() =>
                              handleFeedback(category, item.name, "dislike")
                            }
                          >
                            <Heart
                              size={16}
                              className="rotate-180"
                              fill={
                                feedback[category]?.[item.name] === "dislike"
                                  ? "white"
                                  : "none"
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-amber-400">
                  Total Price: ${totalPrice.toFixed(2)}
                </h3>
                <p className="text-gray-300 text-sm">
                  Items:{" "}
                  {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                </p>
              </div>
              <button
                className="bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-500"
                onClick={handleOrderSubmission}
              >
                Submit Order
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Confirm Order</h2>
              <p className="text-gray-300 mb-4">
                Are you sure you want to submit the order?
              </p>
              <div className="text-xl font-bold text-amber-400 mb-4">
                Total Price: ${totalPrice.toFixed(2)}
              </div>
              {orderError && (
                <p className="text-red-500 mb-4">{orderError}</p>
              )}
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-amber-400 text-white px-6 py-2 rounded-lg hover:bg-amber-500"
                  onClick={confirmOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Order"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submission Success Card */}
        {submissionSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 shadow-2xl text-center">
              <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Order Submitted Successfully!
              </h2>
              <p className="text-gray-300">
                Thank you for your order. We'll process it shortly.
              </p>
              <button
                className="mt-4 bg-amber-400 text-white px-6 py-2 rounded-lg hover:bg-amber-500"
                onClick={() => setSubmissionSuccess(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}