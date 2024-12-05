import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import userProfile from "../assets/images/userprofile.png";

const Profile = ({ user }) => {
    const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="p-6 bg-mint-500 text-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src={user.photoURL || userProfile}
          className="w-12 h-12 rounded-full border-gray-700"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-600">
            {user.displayName || "Anonymous"}
          </h2>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSignOut}
          className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
        >
            Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
