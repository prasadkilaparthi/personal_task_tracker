import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar is hidden by default for smaller screens
  const [showLinks, setShowLinks] = useState(false); // Track if the links should be shown

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility for small/medium screens
  };

  const toggleLinks = () => {
    setShowLinks(!showLinks); // Toggle showing task options (links) on small/medium screens
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div
        className={`bg-[#2C2E3A] text-white w-64 p-4 min-h-screen transition-all ${
          isOpen ? "block" : "hidden"
        } sm:block`}
      >
        <h2 className="text-xl font-bold mb-6">Task Tracker</h2>
        <div className="space-y-4">
          <Link
            to="/dashboard/all"
            className="block hover:text-[#0A21C0] transition duration-200"
          >
            All Tasks
          </Link>
          <Link
            to="/dashboard/in-progress"
            className="block hover:text-[#0A21C0] transition duration-200"
          >
            In Progress
          </Link>
          <Link
            to="/dashboard/completed"
            className="block hover:text-[#0A21C0] transition duration-200"
          >
            Completed
          </Link>
        </div>
      </div>

      {/* Sidebar toggle button for small and medium screens */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 left-4 p-2 bg-[#2C2E3A] text-white rounded-md"
      >
        {isOpen ? "Close" : "Open"} Menu
      </button>

      {/* Menu Icon for small and medium screens */}
      <button
        onClick={toggleLinks}
        className="sm:hidden fixed top-24 right-4 p-2 bg-[#2C2E3A] text-white rounded-md z-40"
      >
        {showLinks ? "Hide" : "Show"} Filters
      </button>

      {/* Conditional Rendering for Links on small/medium screens */}
      {showLinks && (
        <div className="sm:hidden fixed top-24 left-4 p-4 bg-[#2C2E3A] text-white rounded-md w-56 z-30">
          <h2 className="text-xl font-bold mb-6">Task Tracker</h2>
          <div className="space-y-4">
            <Link
              to="/dashboard/all"
              className="block hover:text-[#0A21C0] transition duration-200"
              onClick={() => setShowLinks(false)} // Close menu when a link is clicked
            >
              All Tasks
            </Link>
            <Link
              to="/dashboard/in-progress"
              className="block hover:text-[#0A21C0] transition duration-200"
              onClick={() => setShowLinks(false)} // Close menu when a link is clicked
            >
              In Progress
            </Link>
            <Link
              to="/dashboard/completed"
              className="block hover:text-[#0A21C0] transition duration-200"
              onClick={() => setShowLinks(false)} // Close menu when a link is clicked
            >
              Completed
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
