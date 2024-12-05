import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to homepage after logout
    } catch (e) {
      console.error("Logout failed:", e.message);
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close the mobile menu when an item is clicked
  };

  // Function to handle Task Tracker (Dashboard) navigation
  const handleTaskTrackerClick = () => {
    if (user) {
      navigate("/dashboard/all"); // Navigate to the dashboard if the user is logged in
    } else {
      navigate("/"); // Redirect to homepage if the user is not logged in
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-gray-100 p-5 shadow-md">
      <nav className="container mx-auto flex justify-between items-center text-gray-800">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link to="/" className="hover:text-gray-600 transition duration-200">
            Task Tracker
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={handleTaskTrackerClick} // Handle Task Tracker click
                className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
              >
                Dashboard
              </button>
              <Link
                to="/profile"
                className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
                onClick={handleMenuItemClick} // Close menu on click
              >
                Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }} // Close menu and log out
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                onClick={handleMenuItemClick} // Close menu on click
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300"
                onClick={handleMenuItemClick} // Close menu on click
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 p-4 space-y-4">
          {user ? (
            <>
              <button
                onClick={handleTaskTrackerClick} // Handle Task Tracker click
                className="block py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 w-full"
              >
                Task Tracker
              </button>
              <Link
                to="/profile"
                className="block py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
                onClick={handleMenuItemClick} // Close menu on click
              >
                Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }} // Close menu and log out
                className="block py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="block py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                onClick={handleMenuItemClick} // Close menu on click
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-300"
                onClick={handleMenuItemClick} // Close menu on click
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
