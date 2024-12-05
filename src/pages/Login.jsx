import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard/All");
      setError("");
    } catch (e) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">
          Log In
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-600 focus:outline-none"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-teal-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
