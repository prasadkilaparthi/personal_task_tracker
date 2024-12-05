import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50"> {/* Light teal background */}
      <div className="bg-white max-w-lg w-full p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to Task Tracker
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Organize your daily tasks and stay on top of your goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200 w-full sm:w-auto"
          >
            Sign Up
          </Link>
        </div>
        <p className="mt-6 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline hover:text-blue-700">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
