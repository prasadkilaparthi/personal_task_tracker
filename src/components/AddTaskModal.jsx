import React, { useState } from "react";

const AddTaskModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({
        title,
        description,
        dueDate,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose(); // Close the modal after successful submission
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <textarea
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="date"
            placeholder="Due date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <div className="flex flex-col sm:flex-row sm:justify-end space-x-0 sm:space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-300 rounded-lg w-full sm:w-auto text-center"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-300 hover:bg-green-600 rounded-lg w-full sm:w-auto text-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
